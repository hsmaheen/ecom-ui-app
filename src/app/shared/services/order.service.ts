import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Order } from '../models/order';
import { Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { ProductService } from './product.service';
import { map } from 'rxjs/operators';

@Injectable()
export class OrderService {
  orderApi = environment.orderApiUrl;
  private orderSubject = new Subject<Order>();
  public customerOrder: Order;

  constructor(private http: HttpClient,
    private authSvc: AuthService,
    private productSvc: ProductService) {

    this.orderListener()
      .subscribe((orderData) => {
        if ((orderData !== null) || (orderData !== undefined)) {
          this.customerOrder = orderData;
        }
      });

    if (this.authSvc.isLoggedIn()) {
      console.log('Logged in');
      const userID = localStorage.getItem('userID');
      this.getCartItemforUser()
        .subscribe((order) => {
          if (order) {
            this.productSvc.addProductsToLocalCart(order.products)
            // order.products.forEach(prod => this.productSvc.addProductToLocalCart(prod));
          } else {
            console.log("Clearing cart");
            localStorage.setItem('local_prods', null);
            this.productSvc.cartCount = 0;
          }
        });
      // this.getCartItemsByUserId(userID);

      // this.calculateLocalCartProdCounts();
    } else {
      //  console.log('Not Logged in');
      // this.calculateLocalCartProdCounts();
    }

  }

  getOrders(userID: String): Observable<Order[]> {
    const getOrdersUrl = 'orders/' + userID;
    return this.http
      .get<{ orders: any }>(
        this.orderApi + getOrdersUrl
      )
      .pipe(map((postData) => {
        return postData.orders.map(order => {
          return {
            orderId: order._id,
            userId: order.userId,
            status: order.status,
            products: order.products,
            paymentMode: order.paymentMode,
            transactionId: order.transactionId,
            orderAddress: order.orderAddress,
            orderPostalCode: order.orderPostalCode,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt


          };
        });
      }))
      .map(transformedData => {
        return transformedData as Order[];
      });
  }

  orderListener() {
    return this.orderSubject.asObservable();
  }

  updatedOrderSubject(order: Order) {
    console.log('Updating data');
    console.log(order);
    this.orderSubject.next(order);
  }

  getCartItemforUser(): Observable<Order> {
    const userID = localStorage.getItem('userID');
    return this.getCartItemsByUserId(userID)
      .map((order) => {
        if (order) {
          return order;
        }
      });

  }


  getCartItemsByUserId(userId: string): Observable<Order> {
    const getCartItemsUrl = 'order/active/' + userId;
    console.log(this.orderApi + getCartItemsUrl);
    return this.http
      .get<{ order: Order }>(this.orderApi + getCartItemsUrl)
      .map((data) => {
        return data.order;

      });

  }

  addToCart(userId: string, products: Product[]): Observable<Order> {
    const order = { userId: userId, products: products };
    const addToCartUrl = 'order/cart';
    return this.http
      .post(this.orderApi + addToCartUrl, order)
      .map((data) => {
        console.log(data);
        return data as Order;
      });
  }

  removeFromCart(userId: string, productIds: Number[]): Observable<Order> {
    const order = { userId: userId, products: productIds };
    console.log(order);
    const addToCartUrl = 'order/cart/remove';
    return this.http
      .post(this.orderApi + addToCartUrl, order)
      .map((data) => {
        return data as Order;
      });
  }

  satisfyOrder() {
    console.log('Satisfy');
    console.log(this.customerOrder);

  }

  updateOrderStatus(orderId: String,
    txnId: String,
    paymentMode: string,
    status: string,
    address: String): Observable<Order> {

    const updateOrder = { orderId: orderId, transactionId: txnId, paymentMode: paymentMode, address: address };
    const updateCarttUrl = 'order/status/' + status;
    return this.http
      .put<{ order: Order }>(this.orderApi + updateCarttUrl, updateOrder)
      .map((data) => {
        return data.order;
      });
  }

}

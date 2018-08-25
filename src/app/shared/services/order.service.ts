import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Order } from '../models/order';
import { Observable } from 'rxjs';


@Injectable()
export class OrderService {
  orderApi = environment.orderApiUrl;

  constructor(private http: HttpClient) {

  }

  addToCart(userId: string, products: Product[]): Observable<Order> {
    const order = { userId: userId, products: products };
    const addToCartUrl = 'order/cart/add';
    return this.http
      .post(this.orderApi + addToCartUrl, order)
      .map((data) => {
        console.log(data);
        return data as Order;
      });
  }

  removeFromCart(userId: string, productIds: String[]) {
    const order = { userId: userId, productIds: productIds };
    const addToCartUrl = 'order/cart/remove';
    this.http
      .post(this.orderApi + addToCartUrl, order)
      .subscribe((data) => {
        console.log(data);
      });
  }



}

import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Order } from '../models/order';
import { Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { ProductService } from './product.service';
import { CreditCard, Transaction } from '../models/credit-card';
import { OrderService } from './order.service';


@Injectable()
export class PaymentService {
  paymentApi = environment.paymentApiUrl;


  constructor(private http: HttpClient, private orderSvc: OrderService) { }

  makePayment(card: CreditCard) {
    const makePaymentUrl = 'payment/make';
    return this.http
      .post<{ isPaymentValid: boolean }>(this.paymentApi + makePaymentUrl, card)
      .subscribe((data) => {
        const order = this.getCurrenOrder();
        if (data.isPaymentValid) {
          this.createTxn(order)
            .subscribe((txn) => {
              return txn;
            });


        } else {
          this.createTxn(order)
            .subscribe((txn) => {
              return txn;
            });
        }
      });
  }

  createTxn(order: Order): Observable<Transaction> {
    const createTxnUrl = 'payment/transaction/create';
    const txn = { userId: order.userId, orderId: order.orderId, status: order.status };
    return this.http
      .post<{ transaction: Transaction }>(this.paymentApi + createTxnUrl, txn)
      .map((data) => {
        return data.transaction;

      });
  }


  getCurrenOrder() {
    return this.orderSvc.customerOrder;

  }










}

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
import { map } from 'rxjs/operators';


@Injectable()
export class PaymentService {
  paymentApi = environment.paymentApiUrl;


  constructor(private http: HttpClient, private orderSvc: OrderService) { }

  // makePayment(card: CreditCard) {
  //   const makePaymentUrl = 'payment/make';
  //   return this.http
  //     .post<{ isPaymentValid: boolean }>(this.paymentApi + makePaymentUrl, card)
  //     .map((data) => {
  //       const order = this.getCurrenOrder();
  //       if (data.isPaymentValid) {
  //         this.createTxn(order)
  //           .map((txn) => {
  //             return txn;
  //           });


  //       } else {
  //         this.createTxn(order)
  //           .map((txn) => {
  //             return txn;
  //           });
  //       }
  //     });
  // }

  makePaymentNew(card: CreditCard) {
    const makePaymentUrl = 'payment/make';
    return this.http
      .post<{ isPaymentValid: boolean }>(this.paymentApi + makePaymentUrl, card)
      .map((data) => {
        return data.isPaymentValid;
        // const order = this.getCurrenOrder();
        // if (data.isPaymentValid) {

        // }

      });
  }

  createTxn(order: Order, txnStatus: String) {
    const createTxnUrl = 'payment/transaction/create';
    const txn = { userId: order.userId, orderId: order.orderId, status: txnStatus };
    return this.http
      .post<{ transaction: any }>(this.paymentApi + createTxnUrl, txn)
      .pipe(map((txnData) => {
        const txn = txnData.transaction;
        return {
          txnId: txn._id,
          userId: txn.userId,
          status: txn.status,
          orderId: txn.orderId,
          createdAt: txn.createdAt
        };
      }))
      .map(tranformedData => {
        return tranformedData as Transaction;

      });
  }

  getCurrenOrder() {
    return this.orderSvc.customerOrder;

  }










}

import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Order } from '../models/order';
import { Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { ProductService } from './product.service';
import { CreditCard } from '../models/credit-card';


@Injectable()
export class PaymentService {
  paymentApi = environment.paymentApiUrl;


  constructor(private http: HttpClient) { }

  makePayment(card: CreditCard): Observable<boolean> {
    const makePaymentUrl = 'payment/make';
    return this.http
      .post<{ isPaymentValid: boolean }>(this.paymentApi + makePaymentUrl, card)
      .map((data) => {
        return data.isPaymentValid;
      });
  }


}

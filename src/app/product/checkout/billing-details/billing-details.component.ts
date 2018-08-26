import { Component, OnInit } from '@angular/core';
import { CreditCard } from '../../../shared/models/credit-card';
import { NgForm } from '@angular/forms';
import { OrderService } from '../../../shared/services/order.service';
import { Order } from '../../../shared/models/order';
import { PaymentService } from '../../../shared/services/payment.service';
import { ToastyService, ToastOptions } from 'ng2-toasty';

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.scss']
})
export class BillingDetailsComponent implements OnInit {
  public crediCard: CreditCard = new CreditCard();
  constructor(
    private orderSvc: OrderService,
    private paymentSvc: PaymentService,
    private toastySvc: ToastyService) { }

  ngOnInit() {

  }

  makePayment(form: NgForm) {
    const data = form.value;

    this.crediCard.creditCardNumber = data['creditCardNumber'];
    this.crediCard.cvv = data['cvv'];
    this.crediCard.expiration = data['expiration'];
    this.crediCard.nameOnCard = data['nameOnCard'];

    // data['creditCardNumber'] = this.crediCard.creditCardNumber;
    // data['cvv'] = this.crediCard.cvv;
    // data['expiration'] = this.crediCard.expiration;
    // data['nameOnCard'] = this.crediCard.nameOnCard;

    console.log('Order is as follows');
    this.paymentSvc.makePayment(this.crediCard)
      .subscribe((isPaymentValid) => {
        if (isPaymentValid) {
          console.log('Payment Valid');

          const toastOption: ToastOptions = {
            title: 'Payment',
            msg: 'Payment Completed Successfully',
            showClose: true,
            timeout: 5000,
            theme: 'material'
          };
          this.toastySvc.wait(toastOption);

        } else {
          console.log('Payment InValid');

          const toastOption: ToastOptions = {
            title: 'Payment',
            msg: 'Payment Failed, please try again',
            showClose: true,
            timeout: 5000,
            theme: 'material'
          };
          this.toastySvc.wait(toastOption);

        }


      });

  }

}

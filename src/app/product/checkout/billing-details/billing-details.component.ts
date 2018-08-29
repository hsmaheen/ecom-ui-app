import { Component, OnInit } from '@angular/core';
import { CreditCard } from '../../../shared/models/credit-card';
import { NgForm } from '@angular/forms';
import { OrderService } from '../../../shared/services/order.service';
import { Order } from '../../../shared/models/order';
import { PaymentService } from '../../../shared/services/payment.service';
import { ToastyService, ToastOptions } from 'ng2-toasty';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

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
    private toastySvc: ToastyService,
    private router: Router,
    private authSvc: AuthService) { }

  ngOnInit() {

  }

  makePayment(form: NgForm) {
    const data = form.value;

    this.crediCard.creditCardNumber = data['creditCardNumber'];
    this.crediCard.cvv = data['cvv'];
    this.crediCard.expiration = data['expiration'];
    this.crediCard.nameOnCard = data['nameOnCard'];

    console.log('Order is as follows');
    this.paymentSvc.makePaymentNew(this.crediCard)
      .subscribe((isPaymentValid) => {
        if (isPaymentValid) {

          const order = this.paymentSvc.getCurrenOrder();
          this.paymentSvc.createTxn(order, 'PAYMENT_COMPLETED')
            .subscribe((txn) => {

              this.orderSvc.updateOrderStatus(order.orderId, txn.txnId, 'cc', 'Paid')
                .subscribe((order) => {

                  const toastOption: ToastOptions = {
                    title: 'Payment',
                    msg: 'Payment Completed Successfully',
                    showClose: true,
                    timeout: 5000,
                    theme: 'material'
                  };
                  this.toastySvc.wait(toastOption);
                  this.router.navigate(['./orders/user/', this.authSvc.getLoggedInUser().$key]);
                });

            });

        } else {

          const order = this.paymentSvc.getCurrenOrder();
          this.paymentSvc.createTxn(order, 'PAYMENT_FAILED')
            .subscribe((txn) => {

              this.orderSvc.updateOrderStatus(order.orderId, txn.txnId, 'cc', 'PaymentFailed')
                .subscribe((order) => {


                  const toastOption: ToastOptions = {
                    title: 'Payment',
                    msg: 'Payment Failed, please try again',
                    showClose: true,
                    timeout: 5000,
                    theme: 'material'
                  };
                  this.toastySvc.wait(toastOption);

                });



            });
        }
      });

  }

}

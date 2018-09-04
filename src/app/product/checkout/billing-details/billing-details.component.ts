import { ProductService } from './../../../shared/services/product.service';
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
  currentOrder: Order;
  constructor(
    private orderSvc: OrderService,
    private paymentSvc: PaymentService,
    private toastySvc: ToastyService,
    private router: Router,
    private prodSvc: ProductService,
    private authSvc: AuthService) {
      this.currentOrder = this.paymentSvc.getCurrenOrder();
      if (this.currentOrder === null || this.currentOrder === undefined) {
        this.router.navigate(['./catalog']);


      }
      console.log('Current order is as follows');
      console.log(this.currentOrder);
     }

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

          this.paymentSvc.createTxn(this.currentOrder, 'PAYMENT_COMPLETED')
            .subscribe((txn) => {

              this.orderSvc.updateOrderStatus(this.currentOrder.orderId, txn.txnId, 'cc', 'Paid', this.currentOrder.orderAddress)
                .subscribe((orderData) => {

                  const toastOption: ToastOptions = {
                    title: 'Payment',
                    msg: 'Payment Completed Successfully',
                    showClose: true,
                    timeout: 5000,
                    theme: 'material'
                  };
                  this.prodSvc.clearCartItem();
                  this.toastySvc.wait(toastOption);
                  this.router.navigate(['./user/orders']);
                });

            });

        } else {
          this.paymentSvc.createTxn(this.currentOrder, 'PAYMENT_FAILED')
            .subscribe((txn) => {

              this.orderSvc.updateOrderStatus(this.currentOrder.orderId, txn.txnId, 'cc', 'PaymentFailed', this.currentOrder.orderAddress)
                .subscribe((orderData) => {


                  const toastOption: ToastOptions = {
                    title: 'Payment',
                    msg: 'Payment Failed, please try again',
                    showClose: true,
                    timeout: 5000,
                    theme: 'material'
                  };
                  this.prodSvc.clearCartItem();
                  this.toastySvc.wait(toastOption);
                  this.router.navigate(['./user/orders']);

                });

            });
        }
      });

  }

}

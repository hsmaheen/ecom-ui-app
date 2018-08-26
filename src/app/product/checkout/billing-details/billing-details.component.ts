import { Component, OnInit } from '@angular/core';
import { CreditCard } from '../../../shared/models/credit-card';
import { NgForm } from '@angular/forms';
import { OrderService } from '../../../shared/services/order.service';
import { Order } from '../../../shared/models/order';

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.scss']
})
export class BillingDetailsComponent implements OnInit {
  public crediCard: CreditCard = new CreditCard();
  constructor(private orderSvc: OrderService) { }

  ngOnInit() {

  }

  makePayment(form: NgForm) {
    const data = form.value;

    data['creditCardNumber'] = this.crediCard.creditCardNumber;
    data['cvv'] = this.crediCard.cvv;
    data['expiration'] = this.crediCard.expiration;
    data['nameOnCard'] = this.crediCard.nameOnCard;

    console.log('Order is as follows');
    this.orderSvc.satisfyOrder();



  }

}

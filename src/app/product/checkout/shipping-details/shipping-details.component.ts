import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user';
import { Order } from '../../../shared/models/order';
import { AuthService } from '../../../shared/services/auth.service';
import { NgForm } from '@angular/forms';
import { OrderService } from '../../../shared/services/order.service';
import { Router } from '@angular/router';
Router


@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.scss']
})
export class ShippingDetailsComponent implements OnInit {
  user: User;
  order: Order = new Order();
  userEmail: String = '';


  constructor(authSvc: AuthService,
    private orderSvc: OrderService,
    private router: Router) {
    this.user = new User();
    authSvc.userObservable
      .subscribe((user) => {
        this.getOrderByUserId(user.uid);
        this.userEmail = user.email;
      });
  }

  ngOnInit() {
  }

  getOrderByUserId(userID: string) {
    this.orderSvc.getCartItemsByUserId(userID)
      .subscribe((order) => {
        this.order = order;
      });
  }


  updateOrderDetails(form: NgForm) {
    const data = form.value;

    data['emailId'] = this.userEmail;
    // data['userName'] = this.user.userName;
    // data['orderAddress'] = this.order.orderAddress;
    // data['orderPostalCode'] = this.order.orderPostalCode;

    this.order.orderAddress = data['orderAddress'];
    this.order.orderPostalCode = data['orderPostalCode'];
    this.orderSvc.updatedOrderSubject(this.order);




  }

}

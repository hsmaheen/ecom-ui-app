import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user';
import { Order } from '../../../shared/models/order';
import { AuthService } from '../../../shared/services/auth.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.scss']
})
export class ShippingDetailsComponent implements OnInit {
  user: User;


  constructor(private authSvc: AuthService) {
    this.user = new User();
    this.user = authSvc.getLoggedInUser();
   }

  ngOnInit() {
  }

  updateOrderDetails(form: NgForm) {
    const data = form.value;

    data['emailId'] = this.user.emailId;
    data['userName'] = this.user.userName;
  }

}

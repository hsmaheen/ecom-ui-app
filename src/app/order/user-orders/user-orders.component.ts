import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../shared/models/order';
import { OrderService } from '../../shared/services/order.service';


@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {
  userID: string;
  orders: Order[];

  constructor(private router: Router,
    private orderSvc: OrderService) {
    this.userID = localStorage.getItem('userID');

  }


  ngOnInit() {
    this.getOrdersBasedOnUseId();
  }

  getOrdersBasedOnUseId() {
    this.orderSvc.getOrders(this.userID)
      .subscribe((orders) => {
        this.orders = orders;
        console.log(this.orders);

      });

  }



}

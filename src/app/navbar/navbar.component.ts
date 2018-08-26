import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { ProductService } from '../shared/services/product.service';
import { OrderService } from '../shared/services/order.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router,
    public productService: ProductService,
    public orderSvc: OrderService
  ) { }


  ngOnInit() {
  }
  logout() {
    localStorage.clear();
    this.productService.calculateLocalCartProdCounts();
    this.authService.logout();
    this.router.navigate(['/']);
  }

}

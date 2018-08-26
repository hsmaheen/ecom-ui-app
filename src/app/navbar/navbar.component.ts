import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { ProductService } from '../shared/services/product.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router,
    public productService: ProductService
  ) { }

  ngOnInit() {
  }
  logout() {
    localStorage.clear();
    this.authService.logout();
    this.router.navigate(['/']);
  }

}

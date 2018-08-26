import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/models/product';

@Component({
  selector: 'app-checkout-products',
  templateUrl: './checkout-products.component.html',
  styleUrls: ['./checkout-products.component.scss']
})
export class CheckoutProductsComponent implements OnInit {

  checkoutProducts: Product[];

  totalPrice = 0;
  constructor(private productService: ProductService) {
    const products = productService.getLocalCartProducts();

    this.checkoutProducts = products;

    products.forEach(product => {
      this.totalPrice += product.productPrice * product.cartQty;
    });
  }

  ngOnInit() { }

}

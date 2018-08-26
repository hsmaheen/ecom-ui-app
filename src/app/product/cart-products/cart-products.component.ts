import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ProductService } from '../../shared/services/product.service';
import { OrderService } from '../../shared/services/order.service';
@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.scss']
})
export class CartProductsComponent implements OnInit {
  cartProducts: Product[];
  showDataNotFound = true;

  // Not Found Message
  messageTitle = 'No Products Found in Cart';
  messageDescription = 'Please, Add Products to Cart';

  constructor(private productService: ProductService,
    private orderSvc: OrderService) { }

  ngOnInit() {
    this.getCartProduct();
  }

  removeCartProduct(product: Product) {
    const userID = localStorage.getItem('userID');
    const productIds: Number[] = [];
    productIds.push(product.productId);
    if (userID === null || userID === undefined) {
      this.productService.removeLocalCartProduct(product);
      this.getCartProduct();
    } else {
      this.orderSvc.removeFromCart(userID, productIds)
        .subscribe((data) => {
          if (data !== null && data !== undefined) {
            this.productService.removeLocalCartProduct(product);
            this.getCartProduct();
          }
        });
    }

    // this.productService.removeLocalCartProduct(product);


    // Recalling
  }

  getCartProduct() {
    this.cartProducts = this.productService.getLocalCartProducts();
  }
}

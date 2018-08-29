import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../shared/models/product';
import { ProductService } from '../../shared/services/product.service';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  private sub: any;
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private orderSvc: OrderService
  ) {
    this.product = new Product();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id']; // (+) converts string 'id' to a number
      this.getProductDetail(id);
    });
  }

  getProductDetail(id: string) {
    this.productService.getProductById(id)
      .subscribe((data) => {
        this.product = data;
      });

  }

  addToCart(product: Product) {
    const userID = localStorage.getItem('userID');
    const products: Product[] = [];
    products.push(product);

    if (userID === null || userID === undefined) {
      this.productService.addProductToLocalCart(product);
    } else {
      this.orderSvc.addToCart(userID, products)
        .subscribe((data) => {
          if (data !== null && data !== undefined) {
            this.productService.addProductToLocalCart(product);
          }
        }),
        ((err) => {
          console.log("Error is here");

        });

    }

  }

ngOnDestroy() {
  this.sub.unsubscribe();
}
}

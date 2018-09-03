import { Component, OnInit } from "@angular/core";
import { Product } from "../../shared/models/product";
import { AuthService } from "../../shared/services/auth.service";
import { ProductService } from "../../shared/services/product.service";
import { Subscription } from "rxjs";
import { OrderService } from "../../shared/services/order.service";
import { Order } from "../../shared/models/order";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
  productList: Product[];

  private productsSub: Subscription;

  page = 1;
  constructor(
    public authService: AuthService,
    private productService: ProductService,
    private orderService: OrderService // private spinnerService: LoaderSpinnerService
  ) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getProducts();
    this.productsSub = this.productService
      .getProductsUpdateListener()
      .subscribe((products: Product[]) => {
        this.productList = products;
      });
  }

  addToCart(product: Product) {
    const userID = localStorage.getItem('userID');
    const products: Product[] = [];
    products.push(product);

    if (userID === null || userID === undefined) {
      this.productService.addProductToLocalCart(product);
    } else {
      this.orderService.addToCart(userID, products).subscribe(data => {
        if (data !== null && data !== undefined) {
          this.productService.addProductToLocalCart(product);
        }
      });
    }
  }
}

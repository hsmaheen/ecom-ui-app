import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { ToastyService, ToastOptions } from 'ng2-toasty';
import { AuthService } from './auth.service';


@Injectable()
export class ProductService {

  products: Product[] = [];
  cartCount = 0;
  private productsUpdated = new Subject<Product[]>();

  constructor(private http: HttpClient,
    private authService: AuthService,
    private toastyService: ToastyService) {

    if (this.authService.isLoggedIn()) {
      this.calculateLocalCartProdCounts();
    } else {
      this.calculateLocalCartProdCounts();
    }


  }

  getProducts() {
    this.http
      .get<{ message: string; products: any }>(
        'http://localhost:3000/api/products'
      )
      .pipe(map((postData) => {
        return postData.products.map(post => {
          return {
            $key: post._id,
            productId: post.productId,
            productName: post.productName,
            productCategory: post.productCategory,
            productPrice: post.productPrice,
            productDescription: post.productDescription,
            productImageUrl: post.productImageUrl,
            productAdded: post.productAdded,
            productQuatity: post.productQuatity,
            ratings: post.ratings,
            productSeller: post.productSeller,
            cartQty: 1
          };
        });
      }))
      .subscribe(transformedData => {
        this.products = transformedData;
        this.productsUpdated.next([...this.products]);

      });
  }

  getProductById(id: string): Observable<Product> {
    return this.http
      .get<{ message: string; product: any }>('http://localhost:3000/api/products/' + id)
      .pipe(map((postData) => {
        console.log(postData);
        const post = postData.product;
        return {
          $key: post._id,
          productId: post.productId,
          productName: post.productName,
          productCategory: post.productCategory,
          productPrice: post.productPrice,
          productDescription: post.productDescription,
          productImageUrl: post.productImageUrl,
          productAdded: post.productAdded,
          productQuatity: post.productQuatity,
          ratings: post.ratings,
          productSeller: post.productSeller,
          cartQty: 1
        };

      }))
      .map(transformedData => {
        return transformedData as Product;
      });

  }

  getProductsUpdateListener() {
    return this.productsUpdated.asObservable();
  }

  addProductToCart(product: Product) {
    let localProducts: Product[];

    localProducts = JSON.parse(localStorage.getItem('local_prods')) || [];

    if (localProducts.length === 0) {
      localProducts.push(product);

    } else {

      const existingProd = localProducts.find(p => p.productId === product.productId);
      if (existingProd !== null && existingProd !== undefined) {
        existingProd.cartQty = existingProd.cartQty + 1;

      }

    }



    const toastOption: ToastOptions = {
      title: 'Adding Product to Cart',
      msg: 'Product Adding to the cart',
      showClose: true,
      timeout: 1000,
      theme: 'material'
    };
    this.toastyService.wait(toastOption);
    setTimeout(() => {
      localStorage.setItem('local_prods', JSON.stringify(localProducts));
      this.calculateLocalCartProdCounts();
    }, 500);

  }

  getLocalCartProducts(): Product[] {
    const products: Product[] =
      JSON.parse(localStorage.getItem('local_prods')) || [];
    return products;
  }

  calculateLocalCartProdCounts() {
    this.cartCount = this.getLocalCartProducts().length;
  }

  removeLocalCartProduct(product: Product) {
    const products: Product[] = JSON.parse(localStorage.getItem('local_prods'));

    for (let i = 0; i < products.length; i++) {
      if (products[i].productId === product.productId) {
        products.splice(i, 1);
        break;
      }
    }
    // rest the local storage with the updated list
    localStorage.setItem('local_prods', JSON.stringify(products));

    this.calculateLocalCartProdCounts();
  }



}

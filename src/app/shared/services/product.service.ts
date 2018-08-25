import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastyService, ToastOptions } from 'ng2-toasty';
import { AuthService } from './auth.service';


@Injectable()
export class ProductService {

  products: Product[] = [];
  cartCount = 0;
  private productsUpdated = new Subject<Product[]>();

  /**
   *
   */
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
      .get<{ message: string; posts: any }>(
        'http://localhost:3000/api/products'
      )
      .pipe(map((postData) => {
        return postData.posts.map(post => {
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
            productSeller: post.productSeller
          };
        });
      }))
      .subscribe(transformedData => {
        this.products = transformedData;
        this.productsUpdated.next([...this.products]);

      });
  }

  getProductsUpdateListener() {
    return this.productsUpdated.asObservable();
  }

  getProductsOld() {
    this.http
      .get<{ message: string; products: any }>(
        'http://localhost:3000/api/products'
      )
      .subscribe((data) => {
        console.log(data);
      });
    // .pipe(map((postData) => {
    //   return postData.posts.map(post => {
    //     return {
    //       title: post.title,
    //       content: post.content,
    //       id: post._id
    //     };
    //   });
    // }))
    // .subscribe(transformedPosts => {
    //   this.posts = transformedPosts;
    //   this.postsUpdated.next([...this.posts]);
    // });
  }

  addProductToCart(product: Product) {
    let localProducts: Product[];

    localProducts = JSON.parse(localStorage.getItem('local_prods')) || [];

    localProducts.push(product);

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

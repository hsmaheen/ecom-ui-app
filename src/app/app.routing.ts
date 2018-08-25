import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { CartProductsComponent } from './product/cart-products/cart-products.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';


export const AppRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'catalog', component: ProductListComponent },
  { path: 'cart', component: CartProductsComponent },
  { path: 'details/:id', component: ProductDetailsComponent }
];

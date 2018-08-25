import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './product/product-list/product-list.component';


export const AppRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'catalog', component: ProductListComponent }
];

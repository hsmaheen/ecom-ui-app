import { ErrorsHandler } from './shared/error-handler';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, ErrorHandler } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { AppRoutes } from './app.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ProductListComponent } from './product/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CartProductsComponent } from './product/cart-products/cart-products.component';
import { CartSummaryComponent } from './product/cart-summary/cart-summary.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { CheckoutModule } from './product/checkout/checkout.module';
import { CheckoutRoutingModule } from './product/checkout/checkout.routing';
import { UserOrdersComponent } from './order/user-orders/user-orders.component';
import { NgHttpLoaderModule } from 'ng-http-loader';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    ProductListComponent,
    CartProductsComponent,
    CartSummaryComponent,
    ProductDetailsComponent,
    UserOrdersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    SharedModule,
    RouterModule.forRoot(AppRoutes),
    HttpClientModule,
    CheckoutModule,
    NgHttpLoaderModule
  ],
  providers: [{
      provide: ErrorHandler,
      useClass: ErrorsHandler,
  }],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }

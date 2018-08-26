import { CheckoutRoutingModule } from './checkout.routing';
import { SharedModule } from './../../shared/shared.module';
import { CheckoutNavbarComponent } from './checkout-navbar/checkout-navbar.component';
import { ShippingDetailsComponent } from './shipping-details/shipping-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { BillingDetailsComponent } from './billing-details/billing-details.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { CheckoutProductsComponent } from './checkout-products/checkout-products.component';

@NgModule({
  imports: [CommonModule, SharedModule, CheckoutRoutingModule],
  declarations: [
    CheckoutComponent,
    BillingDetailsComponent,
    ShippingDetailsComponent,
    OrderDetailsComponent,
    CheckoutProductsComponent,
    CheckoutNavbarComponent
  ],
  exports: [CheckoutComponent]
})
export class CheckoutModule {}

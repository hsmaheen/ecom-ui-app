import { CheckoutComponent } from './checkout.component';
import { ShippingDetailsComponent } from './shipping-details/shipping-details.component';
import { BillingDetailsComponent } from './billing-details/billing-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { CheckoutProductsComponent } from './checkout-products/checkout-products.component';

export const checkoutRoutes: Routes = [
  {
    path: 'checkout',
    component: CheckoutComponent,
    children: [
      {
        path: '',
        component: CheckoutProductsComponent,
        outlet: 'checkOutlet'
      },
      {
        path: 'shipping-details',
        component: ShippingDetailsComponent,
        outlet: 'checkOutlet'
      },
      {
        path: 'billing-details',
        component: BillingDetailsComponent,
        outlet: 'checkOutlet'
      },
      { path: 'order-details', component: OrderDetailsComponent, outlet: 'checkOutlet' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(checkoutRoutes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }

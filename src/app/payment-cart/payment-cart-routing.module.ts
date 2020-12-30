import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentCartComponent } from './payment-cart.component';

const routes: Routes = [{ path: '', component: PaymentCartComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentCartRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentCartRoutingModule } from './payment-cart-routing.module';
import { PaymentCartComponent } from './payment-cart.component';
import { ProductServiceService } from './product-service.service';


@NgModule({
  declarations: [PaymentCartComponent],
  imports: [
    CommonModule,
    PaymentCartRoutingModule
  ],
  providers: [ProductServiceService]
})
export class PaymentCartModule { }

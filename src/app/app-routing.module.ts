import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { ThankyouComponent } from './thankyou/thankyou.component';

const routes: Routes = [
  { path: 'paymentCart', loadChildren: () => import('./payment-cart/payment-cart.module').then(m => m.PaymentCartModule) },
  { path: '', component: RegistrationComponent },
  { path: 'thankyou', component: ThankyouComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { MerchantAddDressComponent } from './merchant-add-dress/merchant-add-dress.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MerchantAuthComponent } from './merchant-auth/merchant-auth.component';
import { MerchantHomeComponent } from './merchant-home/merchant-home.component';
import { authGuard } from './auth.guard';
import { MerchantUpdateDressComponent } from './merchant-update-dress/merchant-update-dress.component';
import { SearchComponent } from './search/search.component';
import { DressDetailsComponent } from './dress-details/dress-details.component';
import { CustomerAuthComponent } from './customer-auth/customer-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { MyOrderComponent } from './my-order/my-order.component';

const routes: Routes = [
  { path:'', component:HomeComponent},
  { path:'merchant-auth', component:MerchantAuthComponent},
  { path:'merchant-home', component:MerchantHomeComponent},
  { path:'merchant-add-dress', component:MerchantAddDressComponent},
  { path:'merchant-update-dress/:id', component:MerchantUpdateDressComponent},
  { path:'search/:query', component:SearchComponent},
  {path:'dress-details/:dressId',component:DressDetailsComponent},
  {path:'customer-auth', component:CustomerAuthComponent},
  {path:'cart', component:CartPageComponent},
  {path:'check-out', component:CheckOutComponent},
  {path:'my-order', component:MyOrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

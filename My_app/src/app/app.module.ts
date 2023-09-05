import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MerchantAuthComponent } from './merchant-auth/merchant-auth.component';
import { FormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { MerchantHomeComponent } from './merchant-home/merchant-home.component';
import { MerchantAddDressComponent } from './merchant-add-dress/merchant-add-dress.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MerchantUpdateDressComponent } from './merchant-update-dress/merchant-update-dress.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './search/search.component';
import { FooterComponent } from './footer/footer.component';
import { DressDetailsComponent } from './dress-details/dress-details.component';
import { CustomerAuthComponent } from './customer-auth/customer-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { MyOrderComponent } from './my-order/my-order.component';

@NgModule({
  declarations: [										
    AppComponent,
      HeaderComponent,
      HomeComponent,
      MerchantAuthComponent,
      MerchantHomeComponent,
      MerchantAddDressComponent,
      MerchantUpdateDressComponent,
      SearchComponent,
      FooterComponent,
      DressDetailsComponent,
      CustomerAuthComponent,
      CartPageComponent,
      CheckOutComponent,
      MyOrderComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

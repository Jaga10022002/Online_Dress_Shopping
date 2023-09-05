import { Component, OnInit } from '@angular/core';
import { MerchantService } from '../merchant.service';
import { Router } from '@angular/router';
import { Signup } from '../data-type';

@Component({
  selector: 'app-merchant-auth',
  templateUrl: './merchant-auth.component.html',
  styleUrls: ['./merchant-auth.component.css'],
})
export class MerchantAuthComponent implements OnInit {
  constructor(private merchant: MerchantService, private router: Router) {}
showLogin=false;
authError :string ="";
  ngOnInit() {

  }
  signup(data: Signup): void {
    this.merchant.userSignup(data);
  }
  login(data:Signup){
    this.authError='';
    this.merchant.userLogin(data);
    this.merchant.isLoginError.subscribe((isError)=>{
      if(isError )
      this.authError="Email or Password is incorrect"

    })
  }
  openLogin(){
this.showLogin=true
  }
  openSignup(){
    this.showLogin=false
  }

}

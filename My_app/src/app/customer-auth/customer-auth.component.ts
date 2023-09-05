import { Component, OnInit } from '@angular/core';
import { Dress, Login, Signup, cart } from '../data-type';
import { CustomerService } from '../customer.service';
import { DressService } from '../dress.service';

@Component({
  selector: 'app-customer-auth',
  templateUrl: './customer-auth.component.html',
  styleUrls: ['./customer-auth.component.css'],
})
export class CustomerAuthComponent implements OnInit {
  showLogin:boolean=true;
  authError:string='';
  constructor(private customer: CustomerService,private drees:DressService) {}

  ngOnInit() {
    this.customer.customerauthreload();
  }
  signup(data: Signup) {
    this.customer.customerSignup(data);
  }
  login(data:Login){
    this.customer.customerLogin(data);
    this.customer.invalidcustomerAuth.subscribe((result)=>{
console.warn("Bubba",result);
if(result){
  this.authError="Please enter value Customer details"
}else{
  this.localcarttodbcart();
}

    })
  }
  openSignup(){
this.showLogin=false;
  }
  openLogin() {
this.showLogin=true;
  }
  localcarttodbcart(){
    let data = localStorage.getItem('guestcart');
    let customer = localStorage.getItem('customer');
      let customerId = customer && JSON.parse(customer).id;
    if(data){
     let cartDatalist:Dress[]=JSON.parse(data);


      cartDatalist.forEach((Dress:Dress,index) => {
        let cartData : cart={
          ...Dress,
          dressId:Dress.id,
          customerId,
        };

        delete cartData.id;
        setTimeout(() => {
          this.drees.addtocart(cartData).subscribe((result)=>{
            if(result){
              console.warn("Item stored in DB");

            }

          })
          if(cartDatalist.length===index+1){
            localStorage.removeItem('guestcart');
          }
        }, 400);


      });
    }
setTimeout(() => {
  this.drees.getcartList(customerId)
}, 2500);

  }
}

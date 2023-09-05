import { Component, OnInit } from '@angular/core';
import { DressService } from '../dress.service';
import { cart, order, priceinformation } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
totalamount:number | undefined;
orderedmessage:string | undefined;
cartData:cart[] | undefined
  constructor(private dress:DressService,private router:Router) { }

  ngOnInit() {
    this.dress.Actualcart().subscribe((result) => {

      let price = 0;
      this.cartData=result;
      result.forEach((item) => {
        if(item.Quantity){
          price = price + (+item.price* +item.Quantity);
        }

      });
      this.totalamount=price+(price/15)+100-(price/15)

      console.warn(this.totalamount);
    });
  }
  confirmorder(data:{email:string,address:string,mobile:string}){
let customer = localStorage.getItem('customer');
let customerId = customer && JSON.parse(customer).id;
if(this.totalamount){
  let orderData:order={
    ...data,
    totalamount: this.totalamount,
    customerId,
    id: undefined
  }
  this.cartData?.forEach((item)=>{
setTimeout(() => {
  item.id && this.dress.deletecartitems(item.id)
}, 700);
  })
  this.dress.buynow(orderData).subscribe((result)=>{
if(result){
 this.orderedmessage="Your order has been succesfully placed"
 setTimeout(() => {
  this.router.navigate(['my-order'])
  this.orderedmessage=undefined
 }, 4000);
}
  })
}


  }
}

import { priceinformation } from './../data-type';
import { Component, OnInit } from '@angular/core';
import { DressService } from '../dress.service';
import { cart } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | undefined;
  priceinformation: priceinformation = {
    price: 0,
    gst: 0,
    tax: 0,
    total: 0,
    delivery: 0,
    discount:0,
  };

  constructor(private dress: DressService,private router:Router) {}

  ngOnInit() {
    this.loaddressdetails()

  }
  removetocart(cartId:number | undefined){
    cartId && this.cartData && this.dress.removetocart(cartId).subscribe((result)=>{
      this.loaddressdetails();
    })


  }
  checkout(){
    this.router.navigate(['check-out'])
  }
  loaddressdetails(){
    this.dress.Actualcart().subscribe((result) => {
      this.cartData = result;
      let price = 0;
      result.forEach((item) => {
        if(item.Quantity){
          price = price + (+item.price* +item.Quantity);
        }

      });
      this.priceinformation.price=price;
      this.priceinformation.gst=price/10;
      this.priceinformation.discount=price/10;
      this.priceinformation.delivery=39;
      this.priceinformation.total=price+(price/15)+100-(price/15);
      if(!this.cartData.length){
        this.router.navigate(['/'])
      }


    });
  }
}

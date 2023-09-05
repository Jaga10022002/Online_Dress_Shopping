import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DressService } from '../dress.service';
import { Dress } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  cardType: string = 'default';
  merchantName: string = '';
  searchResult: undefined | Dress[];
  customerName:string = '';
  cartItems=0;
  constructor(private route: Router, private dress: DressService) {}
  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('merchant') && val.url.includes('merchant')) {
          let merchantStore = localStorage.getItem('merchant');
          let merchantData = merchantStore && JSON.parse(merchantStore)[0];
          this.merchantName = merchantData.name;
          this.cardType = 'merchant';

        } else if(localStorage.getItem('customer')){
          let customerStore = localStorage.getItem('customer');
          let customerData = customerStore && JSON.parse(customerStore);
          this.customerName = customerData.name;
          this.cardType='customer';
          this.dress.getcartList(customerData.id)

        } else {
          //console.warn('outside merchant area');
          this.cardType = 'default';
        }
      }
    });
    let cartData=localStorage.getItem('guestcart');
    if(cartData){
      this.cartItems=JSON.parse(cartData).length
    }
    this.dress.cartData.subscribe((items)=>{
this.cartItems=items.length
    })
  }
  logout() {
    localStorage.removeItem('merchant');
    this.route.navigate(['/']);
  }
  customerLogout(){
    localStorage.removeItem('customer');
    this.route.navigate(['/customer-auth']);
    this.dress.cartData.emit([]);
  }
  searchdress(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.dress.searchdress(element.value).subscribe((result) => {
        if (result.length > 6) {
          result.length = 6;
        }

        this.searchResult = result;
      });
    }
  }
  redirect(id: number) {
    this.route.navigate(['dress-details+'+id]);
  }
  clearsearch() {
    this.searchResult = undefined;
  }
  submitSearch(val:string){
   this.route.navigate([`search/${val}`]);
  }
  cartItem(){

  }
}

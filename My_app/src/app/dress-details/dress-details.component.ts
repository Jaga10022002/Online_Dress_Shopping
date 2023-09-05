import { Dress, cart } from './../data-type';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DressService } from '../dress.service';

@Component({
  selector: 'app-dress-details',
  templateUrl: './dress-details.component.html',
  styleUrls: ['./dress-details.component.css'],
})
export class DressDetailsComponent implements OnInit {
  dressData: undefined | Dress;
  cartData: Dress | undefined;
  dressquantity: number = 1;
  quantity: number = 1;
  removeCart = false;
  constructor(
    private activeroute: ActivatedRoute,
    private dress: DressService
  ) {}

  ngOnInit(): void {
    let dressId = this.activeroute.snapshot.paramMap.get('dressId');
    console.warn(dressId);
    dressId &&
      this.dress.getdress(dressId).subscribe((result) => {
        console.warn(result);
        this.dressData = result;
      });

    let cartData = localStorage.getItem('guestcart');
    if (dressId && cartData) {
      let items = JSON.parse(cartData);
      items = items.filter((item: Dress) => dressId == item.id.toString());
      if (items.length) {
        this.removeCart = true;
      } else {
        this.removeCart = false;
      }
    }
    let customer = localStorage.getItem('customer');
    if (customer) {
        let customerId = customer && JSON.parse(customer).id;
      this.dress.getcartList(customerId);
      this.dress.cartData.subscribe((result) => {
        let item = result.filter(
          (item: Dress) => dressId?.toString() === item.dressId?.toString()
        );
        if (item.length) {
          this.cartData = item[0];
          this.removeCart = true;
        }
      });
    }
  }
  Addtocart() {
     if (this.dressData) {
      this.dressData.Quantity = this.dressquantity;
      if (!localStorage.getItem('customer')) {
        this.dress.guestaddtocart(this.dressData);
        this.removeCart = true;
      } else {
        let customer = localStorage.getItem('customer');
        let customerId = customer && JSON.parse(customer).id;
        let cartData: cart = {
          ...this.dressData,
          customerId,
          dressId: this.dressData.id,
        };
        delete cartData.id;

        this.dress.addtocart(cartData).subscribe((result) => {
          if (result) {
            this.dress.getcartList(customerId);
            this.removeCart = true;
          }
        });
      }
    }
  }
  removetocart(dressId: number) {
    if (!localStorage.getItem('customer')) {
      this.dress.removetocartitem(dressId);
      this.removeCart = false;
    } else {
      let customer = localStorage.getItem('customer');
        let customerId = customer && JSON.parse(customer).id;
      console.warn(this.cartData);
      this.cartData &&
        this.dress.removetocart(this.cartData.id).subscribe((result) => {
          if (result) {
            this.dress.getcartList(customerId);
          }
        });
        this.removeCart = false
    }
  }
  handleQuantity(val: string) {
    if (this.dressquantity < 20 && val === 'plus') {
      this.dressquantity += 1;
    } else if (this.dressquantity > 1 && val === 'min') {
      this.dressquantity -= 1;
    }
  }
}

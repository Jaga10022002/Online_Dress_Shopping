import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Dress, cart, order } from './data-type';

@Injectable({
  providedIn: 'root',
})
export class DressService {
  cartData = new EventEmitter<Dress[] | []>();

  constructor(private Http: HttpClient) {}
  adddress(data: Dress) {
    return this.Http.post('http://localhost:3000/dresses', data);
  }
  dresslist() {
    return this.Http.get<Dress[]>('http://localhost:3000/dresses');
  }
  deletedress(id: number) {
    return this.Http.delete(`http://localhost:3000/dresses/${id}`);
  }
  getdress(id: string) {
    return this.Http.get<Dress>(`http://localhost:3000/dresses/${id}`);
  }
  updatedress(dress: Dress) {
    return this.Http.put<Dress>(
      `http://localhost:3000/dresses/${dress.id}`,
      dress
    );
  }
  trendydress() {
    return this.Http.get<Dress[]>('http://localhost:3000/dresses?_limit=6');
  }
  fashiondresses() {
    return this.Http.get<Dress[]>('http://localhost:3000/dresses?_limit=8');
  }
  searchdress(query: string) {
    return this.Http.get<Dress[]>(`http://localhost:3000/dresses?q=${query}`);
  }
  guestaddtocart(data: Dress) {
    let cartData = [];
    let guestcart = localStorage.getItem('guestcart');
    if (!guestcart) {
      localStorage.setItem('guestcart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(guestcart);
      cartData.push(data);
      localStorage.setItem('guestcart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }
  removetocartitem(dressId: number) {
    let cartData = localStorage.getItem('guestcart');
    if (cartData) {
      let items: Dress[] = JSON.parse(cartData);
      items = items.filter((item: Dress) => dressId !== item.id);
      console.warn(items);
      localStorage.setItem('guestcart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }
  addtocart(cartData: cart) {
    return this.Http.post('http://localhost:3000/cart', cartData);
  }
  getcartList(customerId: number) {
    return this.Http.get<Dress[]>(
      'http://localhost:3000/cart?customerId=' + customerId,
      { observe: 'response' }
    ).subscribe((result) => {
      //console.warn(result);

      if (result && result.body) {
        this.cartData.emit(result.body);
      }
    });
  }
  removetocart(cartId: number) {
    return this.Http.delete('http://localhost:3000/cart/' + cartId);
  }
  Actualcart() {
    let customerStore = localStorage.getItem('customer');
    let customerData = customerStore && JSON.parse(customerStore);
    return this.Http.get<cart[]>(
      'http://localhost:3000/cart?customerId=' + customerData.id
    );
  }
  buynow(data: order) {
    return this.Http.post('http://localhost:3000/orders', data);
  }
  buylist() {
    let customerStore = localStorage.getItem('customer');
    let customerData = customerStore && JSON.parse(customerStore);
    return this.Http.get<order[]>(
      'http://localhost:3000/orders?customerId=' + customerData.id
    );
  }
  deletecartitems(cartId: number) {
    return this.Http.delete('http://localhost:3000/cart/' + cartId, {
      observe: 'response',
    }).subscribe((result) => {
      if (result) {
        this.cartData.emit();
      }
    });
  }
  cancelorder(orderId:number){
      return this.Http.delete('http://localhost:3000/orders/'+orderId)
  }
}

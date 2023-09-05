import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, Signup } from './data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MerchantService {
  isMerchantLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError=new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private router: Router) {}
  userSignup(data: Signup) {
    let result = this.http
      .post('http://localhost:3000/merchant', data, { observe: 'response' })
      .subscribe((result) => {

        if (result) {
          localStorage.setItem('merchant', JSON.stringify(result.body));
          this.router.navigate(['merchant-home']);
        }
      });
  }

  userLogin(data: Login) {
    console.warn(data);
    this.http
      .get(
        `http://localhost:3000/merchant?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        console.warn(result);
        if (result && result.body && result.body.length) {
          console.warn('user Logged in');
          localStorage.setItem('merchant', JSON.stringify(result.body));
          this.router.navigate(['merchant-home']);
        } else {
          console.warn('user not logged in');
          this.isLoginError.emit(true)
        }
      });
  }
}

import { EventEmitter, Injectable } from '@angular/core';
import { Login, Signup } from './data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  invalidcustomerAuth = new EventEmitter<boolean>(false)

constructor(private http:HttpClient,private router:Router) { }
customerSignup(customer:Signup){
 this.http.post('http://localhost:3000/customers',customer,{observe:'response'})
 .subscribe((result)=>{
  console.warn(result);
  if(result){
    localStorage.setItem('customer',JSON.stringify(result.body));
    this.router.navigate(['/']);
  }
 })
}
customerLogin(data:Login){
this.http.get<Signup[]>(`http://localhost:3000/customers?email=${data.email}&password=${data.password}`,{observe:'response'})
.subscribe((result)=>{
  if(result && result.body?.length){
    this.invalidcustomerAuth.emit(false)
    localStorage.setItem('customer',JSON.stringify(result.body[0]));
    this.router.navigate(['/']);
  }else{
    this.invalidcustomerAuth.emit(true)
  }

})
}
customerauthreload(){
  if(localStorage.getItem('customer')){
    this.router.navigate(['/'])
  }
}

}

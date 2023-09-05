import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Component, OnInit } from '@angular/core';
import { DressService } from '../dress.service';
import { Dress } from '../data-type';
import {faTrash,faEdit} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-merchant-home',
  templateUrl: './merchant-home.component.html',
  styleUrls: ['./merchant-home.component.css']
})
export class MerchantHomeComponent implements OnInit {
dressList:undefined | Dress[]
dressMessage:undefined | string;
icon=faTrash;
update=faEdit;
  constructor(private dress:DressService) { }

  ngOnInit() {
    this.list();

  }
  deletedress(id:number){
console.warn("Test id", id);
this.dress.deletedress(id).subscribe((result)=>{
if(result){
  this.dressMessage="Dress was deleted"
  this.list();
}
})
setTimeout(() => {
  this.dressMessage=undefined
}, 2500);
  }
list(){
  this.dress.dresslist().subscribe((result)=>{
    console.warn(result);
    this.dressList=result;

  })

}
}

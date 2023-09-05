import { Component, OnInit } from '@angular/core';
import { DressService } from '../dress.service';
import { Dress } from '../data-type';

@Component({
  selector: 'app-merchant-add-dress',
  templateUrl: './merchant-add-dress.component.html',
  styleUrls: ['./merchant-add-dress.component.css']
})
export class MerchantAddDressComponent implements OnInit {
  adddressMessage:string|undefined;

  constructor(private dress:DressService) { }

  ngOnInit() {
  }

  submit(data:Dress){
    console.warn(data);
    this.dress.adddress(data).subscribe((result)=>{
      console.warn(result);
      if(result){
        this.adddressMessage="Dress added Sucessfully";
      }
      setTimeout(()=>this.adddressMessage=undefined,2500)

    })


  }
}

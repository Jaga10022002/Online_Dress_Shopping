import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DressService } from '../dress.service';
import { Dress } from '../data-type';

@Component({
  selector: 'app-merchant-update-dress',
  templateUrl: './merchant-update-dress.component.html',
  styleUrls: ['./merchant-update-dress.component.css'],
})
export class MerchantUpdateDressComponent implements OnInit {
  dressData: undefined | Dress;
  dressMessage: undefined | string;
  constructor(private route: ActivatedRoute, private dress: DressService) {}

  ngOnInit() {
    let dressId = this.route.snapshot.paramMap.get('id');
    console.warn(dressId);
    dressId &&
      this.dress.getdress(dressId).subscribe((data) => {
        console.warn(data);
        this.dressData = data;
      });
  }
  submit(data: Dress) {
    console.warn(data);
    if(this.dressData){
      data.id=this.dressData.id
    }
    this.dress.updatedress(data).subscribe((result) => {
      if (result) {
        this.dressMessage = 'Dress updated Sucessfully';
      }
    });
    setTimeout(() => {
      this.dressMessage = undefined;
    }, 2500);
  }
}

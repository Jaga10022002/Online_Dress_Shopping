import { Component, OnInit } from '@angular/core';
import { DressService } from '../dress.service';
import { Dress } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 trendydress:undefined|Dress[];
 fashiondresses: undefined | Dress[];
  constructor(private dress:DressService) { }

  ngOnInit() {
    this.dress.trendydress().subscribe((data)=>{
      console.warn(data);
      this.trendydress=data;

    });
    this.dress.fashiondresses().subscribe((data: any) => {
      this.fashiondresses=data;
  });
  }

}

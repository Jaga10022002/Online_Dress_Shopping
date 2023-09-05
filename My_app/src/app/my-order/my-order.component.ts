import { Component, OnInit } from '@angular/core';
import { DressService } from '../dress.service';
import { order } from '../data-type';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
orderdata:order[]|undefined
  constructor(private drees:DressService) { }

  ngOnInit() {
    this.getorderlist();
  }
  cancelorder(orderId:number | undefined){
    orderId && this.drees.cancelorder(orderId).subscribe((result)=>{
      this.getorderlist();
    })

  }
  getorderlist(){
    this.drees.buylist().subscribe((result)=>{
      this.orderdata=result
          })
  }

}

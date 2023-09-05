import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DressService } from '../dress.service';
import { Dress } from '../data-type';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResult:undefined|Dress[]

  constructor(private activeroute:ActivatedRoute,private dress:DressService) { }

  ngOnInit():void {
    let query=this.activeroute.snapshot.paramMap.get('query');
    console.warn(query);
    query && this.dress.searchdress(query).subscribe((result)=>{
      this.searchResult=result;

    })

  }

}

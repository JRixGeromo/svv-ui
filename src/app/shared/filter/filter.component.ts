import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor() { }

  showToggle = {};

  faSearch = faSearch;

  minValue: number = 0;
  maxValue: number = 200;
  options: Options = {
    floor: 0,
    ceil: 500,
  };


  ngOnInit(): void {
  }


  toggleTag(key) {
    this.showToggle[key] = !this.showToggle[key];
  }

  status: boolean = false;
  
  clickEvent(){
      this.status = !this.status;       
  }

}

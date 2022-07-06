import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { faCube, faChevronLeft, faChevronRight, faSearch, faFileAlt, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  myDate = new Date();
  faCube = faCube;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faSearch = faSearch;
  faFileAlt = faFileAlt;
  faExchangeAlt = faExchangeAlt;

  hasTransaction = true; 
  showTransaction = {};

  ngOnInit(): void {
  }

   toggleTag(key) {
    this.showTransaction[key] = !this.showTransaction[key];
  }

  transDetail(){
    this.router.navigate(['transaction']);
  }
}

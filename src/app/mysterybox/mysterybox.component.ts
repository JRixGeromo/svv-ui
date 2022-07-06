import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mysterybox',
  templateUrl: './mysterybox.component.html',
  styleUrls: ['./mysterybox.component.css']
})
export class MysteryboxComponent implements OnInit {
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  detail(){
    this.router.navigate(['mystery-box/detail']);
  }

}

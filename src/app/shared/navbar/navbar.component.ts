import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  account = false;
  address: any;

  constructor(
    ) {}

   ngOnInit(): void {
    this.address = localStorage.getItem ('account_address');

    if(!this.address){
      this.account = false;
    }
    else{
      this.account = true;
    }
  }

  profileAccount(){
    localStorage.setItem("profile", "account")
  }

  profileInventory(){
    localStorage.setItem("profile", "inventory")
  }

  profileWallet(){
    localStorage.setItem("profile", "wallet")
  }
}

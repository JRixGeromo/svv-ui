import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { faSearch, faEye, faWallet } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
// import { AngularFirestore } from '@angular/fire/firestore';

import { metamaskFactory } from '../services/metamask.service';
import { EthersService } from '../services/ethers.service';
import { UsersService } from '../services/users.service';
import { NftService } from '../services/nft.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @Input() tab: 'last24h' | '7days' | '30days' = 'last24h';
  @Input() tabListed: 'lifeListed' | 'landListed' = 'lifeListed';
  @Input() tabSold: 'lifeSold' | 'landSold' = 'lifeSold';

  nftList;
  topNFT;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    // private afs: AngularFirestore,
    private userService: UsersService,
    private nftService: NftService
  ) {}

  ngOnInit(): void {
    // Get All WNFT example
    this.nftService.getAllnft().subscribe((data) => {
      this.nftList = data.result.slice(0, 4);
      this.topNFT = data.result[0];
    });
    // const ethers = new EthersService();
    // ethers.getUserAllTokens('0x832561dE27504175e46B3baF7a61Cf4fD989cffC').then((wnftArray) => {
    //   console.log('getAllMetadata');
    //   console.log(wnftArray);
    // });

    //call auth_token
    this.userService.getToken().subscribe((data) => {
      localStorage.setItem('access_token', data.access_token);
    });
  }

  showQuickview(content) {
    this.modalService.open(content, { size: 'xl', centered: true });
  }

  product() {
    this.router.navigate(['product']);
  }
}

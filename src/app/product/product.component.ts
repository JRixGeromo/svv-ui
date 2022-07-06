import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {
  faSearch,
  faEye,
  faList,
  faTh,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
// import { AngularFirestore } from '@angular/fire/firestore';
import { NftService } from '../services/nft.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  faSearch = faSearch;
  faHeart = faHeart;
  faEye = faEye;
  faTh = faTh;
  faList = faList;
  isGrid = true;
  nftList;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    // private afs: AngularFirestore,
    private nftService: NftService
  ) {}

  ngOnInit(): void {
    // Get All NFT example
    this.nftService.getAllnft().subscribe((data) => {
      this.nftList = data.result;
    });
  }

  open(content, size) {
    this.modalService.open(content, { size: size, centered: true });
  }

  productDetail() {
    this.router.navigate(['product/detail']);
  }

  product() {
    this.router.navigate(['product/detail']);
  }

  gridRow(value) {
    if (value == 1) {
      this.isGrid = true;
    } else {
      this.isGrid = false;
    }
  }
}

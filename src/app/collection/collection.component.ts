import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {
  faSearch,
  faEye,
  faList,
  faTh,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
// import { AngularFirestore } from '@angular/fire/firestore';
import { NftService } from '../services/nft.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
})
export class CollectionComponent implements OnInit {
  faSearch = faSearch;
  faHeart = faHeart;
  faEye = faEye;
  faTh = faTh;
  faList = faList;
  isGrid = true;
  name;
  nftList;
  collection;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    // private afs: AngularFirestore,
    private arouter: ActivatedRoute,
    private nftService: NftService
  ) {}

  ngOnInit(): void {
    this.name = this.arouter.snapshot.params['name'];
    // this.getNftBycollection(this.name)

    // this.afs.collection('collection', ref => ref
    //       .where("name", "==", this.name)
    //     )
    //   .valueChanges()
    //    .subscribe(res => {
    //   this.collection = res.length > 0 ?res[0] : null;
    // });

    //  this.afs.collection('nft', ref => ref
    //   .where("collection", "==", this.name)
    //   .orderBy('created_at', 'desc')
    //   )
    //   .valueChanges()
    //   .subscribe(nftList => {
    //     this.getNftBycollection(this.name)
    // });
  }

  getNftBycollection(collection: string) {
    this.nftService.getAllnft().subscribe((data) => {
      this.nftList = data.result.filter(function (el) {
        return el.item_collection == collection; // Changed this so a home would match
      });
    });
  }

  showQuickview(content) {
    this.modalService.open(content, { size: 'xl', centered: true });
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

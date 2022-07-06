import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { AngularFirestore } from '@angular/fire/firestore';
import {
  faSearch,
  faEye,
  faInfoCircle,
  faBookmark,
  faUser,
  faTag,
  faChartLine,
  faSort,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faBuffer } from '@fortawesome/free-brands-svg-icons';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NftService } from '../../services/nft.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  @Input() tab: 'lifeInfo' | 'stats' | 'land' | 'fusion' = 'lifeInfo';

  constructor(
    private modalService: NgbModal,
    private arouter: ActivatedRoute,
    private router: Router,
    // private afs: AngularFirestore,
    private nftService: NftService
  ) {}

  specification;
  showToggle = {};

  faSearch = faSearch;
  faHeart = faHeart;
  faEye = faEye;
  faInfoCircle = faInfoCircle;
  faBookmark = faBookmark;
  faUser = faUser;
  faTag = faTag;
  faBuffer = faBuffer;
  faChartLine = faChartLine;
  faSort = faSort;
  nft;
  key;
  closeResult = '';
  time = { hour: 13, minute: 30 };
  spinners = false;

  selectExpire = [];
  selectedExpire = [];
  settingExpire = {};

  selectBlockchain = [];
  selectedBlockchain = [];
  settingBlockchain = {};

  nftList;
  collection;

  chart = new Chart({
    chart: {
      type: 'line',
    },
    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: 'Line 1',
        type: 'line',
        data: [1, 1.5, 1, 2],
        color: '#E6211A',
      },
    ],
  });

  ngOnInit(): void {
    this.selectExpire = [
      { id: 1, itemName: '3 Days' },
      { id: 2, itemName: '7 Days' },
      { id: 3, itemName: '14 Days' },
    ];

    this.selectedExpire = [];
    this.settingExpire = {
      singleSelection: true,
      text: 'Select Expiration',
      enableSearchFilter: true,
      autoPosition: false,
    };

    this.selectBlockchain = [
      { id: 1, itemName: 'WWB' },
      { id: 2, itemName: 'ETH' },
    ];

    this.selectedBlockchain = [];
    this.settingBlockchain = {
      singleSelection: true,
      text: 'Select Blockchain',
      enableSearchFilter: true,
      autoPosition: false,
    };

    this.key = this.arouter.snapshot.params['key'];
    this.getNftById();
  }

  getNftById() {
    this.nftService.getNftById(this.key).subscribe((data) => {
      this.nft = data.result;
      this.getNftBycollection(this.nft.item_collection);
    });
  }
  getNftBycollection(collection: string) {
    this.nftService.getAllnft().subscribe((data) => {
      this.nftList = data.result.filter(function (el) {
        return el.item_collection == collection; // Changed this so a home would match
      });
    });
  }

  toggleTag(key) {
    this.showToggle[key] = !this.showToggle[key];
  }

  showQuickview(content) {
    this.modalService.open(content, { size: 'xl', centered: true });
  }

  productDetail() {
    this.router.navigate(['product/detail']);
  }

  back() {
    this.router.navigate(['product']);
  }

  open(content) {
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}

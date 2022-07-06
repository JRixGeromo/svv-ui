import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {
  faSearch,
  faEye,
  faShareAlt,
  faPen,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import Swal from 'sweetalert2';
// import { AngularFirestore } from '@angular/fire/firestore';
import { UsersService } from '../services/users.service';
import { NftService } from '../services/nft.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  tabName: any = localStorage.getItem("profile");

  @Input() tab: 'account' | 'inventory' | 'wallet' | 'history' = this.tabName ;
  @Input() tabInventory:
    | 'savanaLife'
    | 'savanaLand'
    | 'mysteryBox'
    | 'activity' = 'savanaLife';
  @Input() tabHistory: 'transactionHistory' | 'balanceHistory' =
    'transactionHistory';

  constructor(
    private modalService: NgbModal,
    private router: Router,
    // private afs: AngularFirestore,
    private userService: UsersService,
    private nftService: NftService
  ) {}

  faSearch = faSearch;
  faHeart = faHeart;
  faEye = faEye;
  faShareAlt = faShareAlt;
  faPen = faPen;
  faFacebookF = faFacebookF;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  userNftList;
  nftList;
  createdList;
  collectedList;
  favouriteList;
  userProfile;
  detail;
  userAdd;
  files: File[] = [];
  username;
  bio;
  image;
  instagram;
  facebook;
  twitter;

  ngOnInit(): void {
    this.nftService.getAllnft().subscribe((data) => {
      this.nftList = data.result.slice(0, 4);
    });

    this.userAdd = localStorage.getItem('account_address');
    this.getUserInfo();
    this.getNftbyUserId();
  }

  getUserInfo() {
    this.userService.connectAccount().subscribe((data) => {
      if (data.success) {
        this.userService.getUserDetailById(this.userAdd).subscribe((data) => {
          this.userProfile = data.result;
          this.username = data.result.username;
          if (data.result.image) {
            this.image = 'https://nftapi.wowoonet.com/user/img/' + this.userAdd;
          } else {
            this.image = '../assets/images/profile.jpg';
          }

          this.bio = data.result.bio;
          this.instagram = data.result.instagram;
          this.facebook = data.result.facebook;
          this.twitter = data.result.twitter;
        });
      } else {
        console.log('failed');
      }
    });
  }

  getNftbyUserId() {
    var param = {
      uid: this.userAdd,
    };
    this.nftService.getNftByUserId(param).subscribe((data) => {
      if (data.success) {
        this.createdList = data.result.created;
        this.collectedList = data.result.collected;
        this.favouriteList = data.result.favourite;
      }
    });
  }

  showQuickview(content) {
    this.modalService.open(content, { size: 'xl', centered: true });
  }

  open(content, type) {
    this.modalService.open(content, { size: type, centered: true });
  }

  productDetail() {
    this.router.navigate(['product/detail']);
  }

  onSelect(event) {
    this.files[0] = event.addedFiles[0];
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSave(name, email) {
    const formData = new FormData();
    if (this.files.length !== 0) {
      formData.append('image', this.files[0]);
    }
    formData.append('username', name);
    formData.append('bio', this.bio);
    formData.append('instagram', email);
    formData.append('facebook', email);
    formData.append('twitter', email);
    formData.append('_id', this.userAdd);

    this.userService.updateUser(formData).subscribe((data) => {
      if (data.result) {
        this.getUserInfo();
        this.modalService.dismissAll();
        Swal.fire({
          title: 'Success!',
          text: 'Your Account has been updated!',
          icon: 'success',
        });
      }
    });
  }

  logout() {
    localStorage.removeItem('account_address');
    this.router.navigate(['home']).then(() => {
      window.location.reload();
    });
  }
}

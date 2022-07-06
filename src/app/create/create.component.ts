import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { AngularFireStorage } from '@angular/fire/storage';
import Swal from 'sweetalert2';
import { merge } from 'rxjs';
import { NftService } from '../services/nft.service';
import { NftContractService } from '../services/nft-contract.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  create;
  errors: any = {};
  submitting;

  files: File[] = [];
  image;

  selectCollection = [];
  selectedCollection = [];
  settingCollection = {};

  selectBlockchain = [];
  selectedBlockchain = [];
  settingBlockchain = {};
  nameInvalid = false;
  descriptionInvalid = false;
  royaltyInvalid = false;
  royaltyErrMsg;
  imageInvalid = false;
  collectionInvalid = false;
  blockchainInvalid = false;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private nftService: NftService,
    private router: Router,
    private nftContract: NftContractService
  ) {}

  ngOnInit(): void {
    this.selectCollection = [
      { id: 1, itemName: 'art' },
      { id: 2, itemName: 'education' },
      { id: 3, itemName: 'utility' },
      { id: 4, itemName: 'sports' },
      { id: 5, itemName: 'music' },
      { id: 6, itemName: 'trading cards' },
    ];

    this.selectedCollection = [];
    this.settingCollection = {
      singleSelection: true,
      text: 'Select Collections',
      enableSearchFilter: true,
      autoPosition: false,
    };

    this.selectBlockchain = [
      { id: 1, itemName: 'Ethereum' },
      { id: 2, itemName: 'WWB' },
      { id: 3, itemName: 'Polygon' },
    ];

    this.selectedBlockchain = [];
    this.settingBlockchain = {
      singleSelection: true,
      text: 'Select Blockchain',
      enableSearchFilter: true,
      autoPosition: false,
    };
  }

  public config1: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
  };

  onSelect(event) {
    this.files[0] = event.addedFiles[0];
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSubmit(f) {
    console.log('88', this.files[0]);

    if (!f.value.name) {
      this.nameInvalid = true;
      console.log(1);
    }

    if (!f.value.description) {
      this.descriptionInvalid = true;
      console.log(2);
    }

    if (!f.value.royalty) {
      this.royaltyInvalid = true;
      this.royaltyErrMsg = 'Royalties is required';
      console.log(3);
    } else if (f.value.royalty < 0 || f.value.royalty > 95) {
      this.royaltyInvalid = true;
      this.royaltyErrMsg = 'Royalties is between 0~95';
      console.log(4);
    }

    if (this.files.length === 0) {
      this.imageInvalid = true;
      console.log(5);
    }

    if (this.selectedCollection.length === 0) {
      this.collectionInvalid = true;
      console.log(6);
    }

    if (this.selectedBlockchain.length === 0) {
      this.blockchainInvalid = true;
      console.log(7);

      return;
    }

    if (f.valid) {
      try {
        //start loading
        //this.spinner.show();
        const formData = new FormData();
        formData.append('media', this.files[0]);
        formData.append('item_name', f.value.name);
        formData.append('item_collection', this.selectedCollection[0].itemName);
        formData.append('blockchain', this.selectedBlockchain[0].itemName);
        formData.append('creator', localStorage.getItem('account_address'));
        formData.append('item_description', f.value.description);
        formData.append('royalty', f.value.royalty);
        this.nftService.createNft(formData).subscribe((res) => {
          console.log(res);
          this.mintNft(res.result.metadata_cid, f.value.royalty);
        });
      } catch (err) {
        //this.spinner.hide();
      }
    }
  }

  async mintNft(cid: string, royalty: number) {
    try {
      const data = await this.nftContract.mintToken(cid, royalty * 1000);
      console.log(data);
      const body = {
        cid: cid,
        owner: data.owner,
        tokenId: data.tokenId,
        mintHash: data.hash,
        timestamp: data.timestamp,
      };
      this.nftService.updateNftBycid(body).subscribe((res) => {
        console.log(res);
        //end loading
        //this.spinner.hide();
        this.router.navigate(['product/detail/' + res.result._id]);
      });
    } catch (err) {
      console.log(err);
      //end loading
      //this.spinner.hide();
      this.nftService.deleteNftBycid(cid).subscribe((res) => {
        console.log(res);
      });
    }
  }
}

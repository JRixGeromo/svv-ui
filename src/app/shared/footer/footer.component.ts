import { Component, OnInit } from '@angular/core';
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
// import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireFunctions } from '@angular/fire/functions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor(
    private aroute: ActivatedRoute,
    private router: Router,
    // private afs: AngularFirestore,
    private aff: AngularFireFunctions
  ) {}

  faFacebookF = faFacebookF;
  faTwitter = faTwitter;
  faInstagram = faInstagram;

  subscribe;
  submitting;
  errors: any = {};

  ngOnInit(): void {}

  onSubscribe(s) {
    const data = s.value;
    let haveError = false;
    this.errors = [];

    if (!data.email) {
      this.errors.email = "You haven't key in your email yet.";
      haveError = true;
    }

    // if(!this.subscribe) {
    //   data.created_at = new Date();
    //   data.key = this.afs.createId();
    //   this.subscribe = this.afs.doc('subscribe-email/' + data.key);
    // }

    if (haveError) {
      return;
    }

    this.submitting = true;

    this.subscribe.set(data, { merge: true }).then(() => {
      Swal.fire({
        title: 'Success!',
        text: 'You are subscribe our monthly newsletter now.',
        icon: 'success',
      }).then(() => {
        s.resetForm();
        this.submitting = false;
      });
    });
  }
}

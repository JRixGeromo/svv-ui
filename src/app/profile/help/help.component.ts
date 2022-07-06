import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { faSearch, faEye, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {


  @Input() tab: 'created'|'collected'|'favourited' = 'created';

  constructor(
    private modalService: NgbModal,
    private router: Router,
  ) { }


  faSearch = faSearch;
  faHeart = faHeart;
  faEye = faEye;
  faShareAlt = faShareAlt;

  ngOnInit(): void {
  }


  showQuickview(content) {
    this.modalService.open(content, { size: 'xl', centered: true  });
  }


  productDetail(){
    this.router.navigate(['product/detail']);
  }

}

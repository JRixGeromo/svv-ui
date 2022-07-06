import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @Input() tab: 'lifeInfo'|'stats'|'land'|'fusion' = 'lifeInfo';

  constructor(
    private router: Router,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
  }
  
  back(){
    this.router.navigate(['mystery-box']);
  }
  
  open(content) {
    this.modalService.open(content, { size: 'lg', centered: true  });
  }


}

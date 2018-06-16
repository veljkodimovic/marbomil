import { Component, OnInit } from '@angular/core';
import { AtestService } from '../atest.service';
import { Router } from '@angular/router';
import { Atest } from '../../../core/types/atest';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-atest-list',
  templateUrl: './atest-list.component.html',
  styleUrls: ['./atest-list.component.scss']
})
export class AtestListComponent implements OnInit {

  atestData: Atest[];

  constructor(private svc: AtestService,
              private router: Router,
              private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.svc.getAllAtests().subscribe(data => {
      this.atestData = data;
    });
  }

  goTo(atest: Atest) {
    this.router.navigate(['/admin/atest/' + atest.id]);
  }

  deleteAction(atest: Atest) {
    this.svc.deleteAtest(atest.id).subscribe(res => {
      console.log('Deleted');
    });
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

}

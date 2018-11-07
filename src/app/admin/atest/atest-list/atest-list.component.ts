import {Component, OnInit, ViewChild} from '@angular/core';
import { AtestService } from '../atest.service';
import { Router } from '@angular/router';
import { Atest } from '@app/core/types/atest';
import { PersistenceService } from '@app/core/persistence.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from '@app/shared/delete-modal/delete-modal';

@Component({
  selector: 'app-atest-list',
  templateUrl: './atest-list.component.html',
  styleUrls: ['./atest-list.component.scss']
})
export class AtestListComponent implements OnInit {
  @ViewChild(DeleteModalComponent)
  private modal: DeleteModalComponent;
  private apiUrl: string;
  atestData: Atest[];

  activeAtest: Atest;

  constructor(private svc: AtestService,
    private router: Router,
    private persistenceService: PersistenceService,
    private modalService: NgbModal
  ) {
    this.apiUrl = persistenceService.apiUrl;
  }

  ngOnInit() {
    this.svc.getAllAtests().subscribe(data => {
      this.atestData = data;
    });
  }

  goTo(atest: Atest) {
    this.router.navigate(['/admin/atest/' + atest.id]);
  }

  openModal(atest: Atest) {
    this.activeAtest = atest;
    this.modal.openModal();
  }

  performDelete(event: any) {
    this.svc.deleteAtest(this.activeAtest.id).subscribe(res => {
      this.svc.getAllAtests().subscribe(data=> {
        this.atestData = data;
      });
    });
  }

}

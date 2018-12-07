import {Component, OnInit, ViewChild} from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { Service } from '@app/core/types/service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from '@app/shared/delete-modal/delete-modal';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {
  @ViewChild(DeleteModalComponent)
  private modal: DeleteModalComponent;
  serviceData: Service[];

  activeService: Service;

  constructor(private svc: ServiceService,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.svc.getAllServices().subscribe(data => {
      this.serviceData = data;
    });
  }

  goTo(service: Service) {
    this.router.navigate(['/admin/service/' + service.id]);
  }

  openModal(service: Service) {
    this.activeService = service;
    this.modal.openModal();
  }

  performDelete(event: any) {
    this.svc.deleteService(this.activeService.id).subscribe(res => {
      this.svc.getAllServices().subscribe(data => {
        this.serviceData = data;
      });
    });
  }

}

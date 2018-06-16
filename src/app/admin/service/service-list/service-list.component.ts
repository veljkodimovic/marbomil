import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { Service } from '@app/core/types/service';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {

  serviceData: Service[];

  constructor(private svc: ServiceService,
              private router: Router,
              private modalService: NgbModal) {}

  ngOnInit() {
    this.svc.getAllServices().subscribe(data => {
      console.log(data);
      this.serviceData = data;
    });
  }

  goTo(service: Service) {
    this.router.navigate(['/admin/service/' + service.id]);
  }

  deleteAction(service: Service) {
    this.svc.deleteService(service.id).subscribe(res => {
      console.log('Deleted');
      this.router.navigate(['/admin/service/']);
    });
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

}

import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})

export class ServiceListComponent implements OnInit {

  serviceData: any;

  constructor(private svc: ServiceService) {}

  ngOnInit() {
    this.svc.getService().subscribe(data => {
      this.serviceData = data;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ServiceService} from '../service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service-view',
  templateUrl: './service-view.component.html',
  styleUrls: ['./service-view.component.scss']
})
export class ServiceViewComponent implements OnInit {

   service: any;
   link: any;
  constructor(private svc: ServiceService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getServiceDetails();
  }

  getServiceDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.svc.getServiceById(id).subscribe(data => {
      this.service = data.data;
    });
  }

}

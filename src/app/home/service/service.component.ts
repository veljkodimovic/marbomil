import { Component, OnInit } from '@angular/core';
import {Service} from '@app/core/types/service';
import {Banner} from '@app/core/types/banner';
import {ServiceService} from '@app/home/service/service.service';
import {BannerService} from '@app/admin/banner/banner.service';

@Component({
  selector: 'app-home-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  serviceSerbia: Service[] = [];
  serviceMacedonia: Service[] = [];
  serviceMontenegro: Service[] = [];
  serviceRSrpska: Service[] = [];
  banner: Banner;

  constructor(private svc: ServiceService,
              private svcBanner: BannerService) { }

  ngOnInit() {
    this.svc.getServiceByCountry('Srbija').subscribe(data => {
      this.serviceSerbia = data;
    });
    this.svc.getServiceByCountry('Makedonija').subscribe(data => {
      this.serviceMacedonia = data;
    });
    this.svc.getServiceByCountry('Crna Gora').subscribe(data => {
      this.serviceMontenegro = data;
    });
    this.svc.getServiceByCountry('Republika Srpska').subscribe(data => {
      console.log(data);
      this.serviceRSrpska = data;
    });
    this.svcBanner.getBannerById(2).subscribe(data => {
      this.banner = data;
    });
  }

}

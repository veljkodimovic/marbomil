import { Component, OnInit } from '@angular/core';
import { BannerService } from '../banner.service';

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss']
})
export class BannerListComponent implements OnInit {

  private bannerData: any;

  constructor(private svc: BannerService) {}

  ngOnInit() {
    this.svc.getBanners().subscribe(data => {
      this.bannerData = data;
    });
  }

}

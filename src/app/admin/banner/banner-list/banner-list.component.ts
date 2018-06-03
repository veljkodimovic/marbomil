import { Component, OnInit } from '@angular/core';
import { BannerService } from '../banner.service';
import { Router } from '@angular/router';
import { Banner } from '../../../core/types/banner';

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss']
})
export class BannerListComponent implements OnInit {

  bannerData: Banner[];

  constructor(private svc: BannerService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.svc.getAllBanners().subscribe(data => {
      console.log(data);
      this.bannerData = data;
    });
  }

  goTo(banner: Banner) {
    this.router.navigate(['/admin/banner/' + banner.id]);
  }

}

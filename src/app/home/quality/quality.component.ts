import { Component, OnInit } from '@angular/core';
import {Banner} from '@app/core/types/banner';
import {BannerService} from '@app/admin/banner/banner.service';

@Component({
  selector: 'app-home-quality',
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.scss']
})
export class QualityComponent implements OnInit {

  banner: Banner;
  constructor(private svc: BannerService) { }

  ngOnInit() {
    this.svc.getBannerById(4).subscribe(data => {
      this.banner = data;
    });
  }

}

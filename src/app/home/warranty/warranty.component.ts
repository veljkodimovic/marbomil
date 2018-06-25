import { Component, OnInit } from '@angular/core';
import {Banner} from '@app/core/types/banner';
import {BannerService} from '@app/admin/banner/banner.service';

@Component({
  selector: 'app-home-warranty',
  templateUrl: './warranty.component.html',
  styleUrls: ['./warranty.component.scss']
})
export class WarrantyComponent implements OnInit {

  banner: Banner;

  constructor(private svc: BannerService) { }

  ngOnInit() {
    this.svc.getBannerById(3).subscribe(data => {
      this.banner = data;
    });
  }

}

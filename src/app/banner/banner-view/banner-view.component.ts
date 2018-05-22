import { Component, OnInit } from '@angular/core';
import { BannerService} from '../banner.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-banner-view',
  templateUrl: './banner-view.component.html',
  styleUrls: ['./banner-view.component.scss']
})
export class BannerViewComponent implements OnInit {

   banner: any;
   link: any;
  constructor(private svc: BannerService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getBannerDetails();
  }

  getBannerDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.svc.getBannerById(id).subscribe(data => {
      this.banner = data.data;
    });
  }

}

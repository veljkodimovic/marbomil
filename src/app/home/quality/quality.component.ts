import { Component, OnInit } from '@angular/core';
import { Banner } from '@app/core/types/banner';
import { PersistenceService } from '@app/core/persistence.service';
import { BannerService } from '@app/admin/banner/banner.service';

@Component({
  selector: 'app-home-quality',
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.scss']
})
export class QualityComponent implements OnInit {

  banner: Banner;
  private apiUrl: string;
  isLoading: boolean;
  constructor(private svc: BannerService,
    private persistenceService: PersistenceService) {
    this.apiUrl = persistenceService.apiUrl;
  }

  ngOnInit() {
    this.isLoading = true;
    this.svc.getAllBanners().subscribe(data => {
      const max = data.length;
      const index =  Math.floor(Math.random() * Math.floor(max));
      this.banner = data[index];
      this.isLoading = false;
    });
  }

}

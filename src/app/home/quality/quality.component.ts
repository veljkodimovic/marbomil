import { Component, OnInit } from '@angular/core';
import {Banner} from '@app/core/types/banner';
import { PersistenceService } from '@app/core/persistence.service';
import {BannerService} from '@app/admin/banner/banner.service';

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
    this.svc.getBannerById(4).subscribe(data => {
      this.banner = data;
      this.isLoading = false;
    });
  }

}

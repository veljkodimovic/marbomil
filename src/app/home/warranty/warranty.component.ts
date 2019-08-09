import { Component, OnInit } from '@angular/core';
import { Banner } from '@app/core/types/banner';
import { PersistenceService } from '@app/core/persistence.service';
import { BannerService } from '@app/admin/banner/banner.service';

@Component({
  selector: 'app-home-warranty',
  templateUrl: './warranty.component.html',
  styleUrls: ['./warranty.component.scss']
})
export class WarrantyComponent implements OnInit {

  banner: Banner;
  private apiUrl: string;
  isLoading: boolean;

  constructor(private svc: BannerService,
    private persistenceService: PersistenceService) {
    this.apiUrl = persistenceService.apiUrl;
  }

  ngOnInit() {
    this.isLoading = true;
    this.svc.getBannerById(3).subscribe(data => {
      this.banner = data;
    });
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

}

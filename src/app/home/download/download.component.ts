import { Component, OnInit } from '@angular/core';
import { Atest } from '@app/core/types/atest';
import { AtestService } from '@app/admin/atest/atest.service';
import { Catalogue } from '@app/core/types/catalogue';
import { CatalogueService } from '@app/admin/catalogue/catalogue.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-home-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

  apiUrl: string;
  atestData: Atest[];
  catalogueData: Catalogue[];
  isLoading: boolean;
  constructor(private atestSvc: AtestService,
    private catalogueSvc: CatalogueService) {
    this.apiUrl = environment.serverUrl;
  }

  ngOnInit() {
    this.isLoading = true;
    this.atestSvc.getAllAtests().subscribe(dataA => {
      this.atestData = dataA;
      this.catalogueSvc.getAllCatalogues().subscribe(dataC => {
        this.catalogueData = dataC;
        this.isLoading = false;
      });
    });

  }

}

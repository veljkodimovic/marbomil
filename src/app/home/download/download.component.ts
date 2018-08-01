import { Component, OnInit } from '@angular/core';
import {Banner} from '@app/core/types/banner';
import { Atest } from '@app/core/types/atest';
import { AtestService } from '@app/admin/atest/atest.service';
import { Catalogue } from '@app/core/types/catalogue';
import { CatalogueService } from '@app/admin/catalogue/catalogue.service';

@Component({
  selector: 'app-home-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

  atestData: Atest[];
  catalogueData: Catalogue[];
  constructor(private atestSvc: AtestService,
              private catalogueSvc: CatalogueService) { }

  ngOnInit() {
    this.atestSvc.getAllAtests().subscribe(data => {
      this.atestData = data;
    });
    this.catalogueSvc.getAllCatalogues().subscribe(data => {
      this.catalogueData = data;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Banner } from '@app/core/types/banner';
import { CatalogueService } from '@app/admin/catalogue/catalogue.service';
import { Catalogue } from '@app/core/types/catalogue';
import { environment } from '@env/environment';

@Component({
  selector: 'app-home-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {

  apiUrl: string;
  catalogueData: Catalogue[];
  isLoading: boolean;
  constructor(private svc: CatalogueService) {
    this.apiUrl = environment.serverUrl;
  }

  ngOnInit() {
    this.isLoading = true;
    this.svc.getAllCatalogues().subscribe(data => {
      this.catalogueData = data;
      this.isLoading = false;
    });
  }

}

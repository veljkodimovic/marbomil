import { Component, OnInit } from '@angular/core';
import {Banner} from '@app/core/types/banner';
import { CatalogueService } from '@app/admin/catalogue/catalogue.service';
import {Catalogue} from '@app/core/types/catalogue';

@Component({
  selector: 'app-home-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {

  catalogueData: Catalogue[];
  constructor(private svc: CatalogueService) { }

  ngOnInit() {
    this.svc.getAllCatalogues().subscribe(data => {
      this.catalogueData = data;
    });
  }

}

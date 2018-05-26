import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';

@Component({
  selector: 'app-catalogue-list',
  templateUrl: './catalogue-list.component.html',
  styleUrls: ['./catalogue-list.component.scss']
})

export class CatalogueListComponent implements OnInit {

  catalogueData: any;

  constructor(private svc: CatalogueService) {}

  ngOnInit() {
    this.svc.getCatalogue().subscribe(data => {
      this.catalogueData = data;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { CatalogueService} from '../catalogue.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-catalogue-view',
  templateUrl: './catalogue-view.component.html',
  styleUrls: ['./catalogue-view.component.scss']
})
export class CatalogueViewComponent implements OnInit {

   catalogue: any;
   link: any;
  constructor(private svc: CatalogueService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getCatalogueDetails();
  }

  getCatalogueDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.svc.getCatalogueById(id).subscribe(data => {
      this.catalogue = data.data;
    });
  }

}

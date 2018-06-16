import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {

  isLoading: boolean;

  constructor() { }

  ngOnInit() {
    this.isLoading = true;
  }

}

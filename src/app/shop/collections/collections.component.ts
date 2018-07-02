import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {

  isLoading: boolean;
  slides: any = [];

  constructor() { }

  ngOnInit() {
    this.isLoading = true;

  }

}

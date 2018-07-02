import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  isLoading: boolean;
  slides: any = [];

  constructor() { }

  ngOnInit() {
    this.isLoading = true;

  }

}

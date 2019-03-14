import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home-shop',
  templateUrl: './shop-logo.component.html',
  styleUrls: ['./shop-logo.component.scss']
})
export class ShopLogoComponent implements OnInit {

  isLoading: boolean;

  constructor() { }

  ngOnInit() {
    this.isLoading = true;
  }

}

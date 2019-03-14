import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss']
})
export class PromoComponent implements OnInit {

  isLoading: boolean;

  constructor() { }

  ngOnInit() {
    this.isLoading = true;
  }

}

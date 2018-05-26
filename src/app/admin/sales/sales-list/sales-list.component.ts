import { Component, OnInit } from '@angular/core';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})

export class SalesListComponent implements OnInit {

  salesData: any;

  constructor(private svc: SalesService) {}

  ngOnInit() {
    this.svc.getSales().subscribe(data => {
      this.salesData = data;
    });
  }

}

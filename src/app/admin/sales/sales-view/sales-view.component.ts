import { Component, OnInit } from '@angular/core';
import { SalesService} from '../sales.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sales-view',
  templateUrl: './sales-view.component.html',
  styleUrls: ['./sales-view.component.scss']
})
export class SalesViewComponent implements OnInit {

   sales: any;
   link: any;
  constructor(private svc: SalesService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getSalesDetails();
  }

  getSalesDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.svc.getSalesById(id).subscribe(data => {
      this.sales = data.data;
    });
  }

}

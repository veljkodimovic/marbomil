import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

   productData: any;

  constructor(private svc: ProductService) {}

  ngOnInit() {
    this.svc.getProduct().subscribe(data => {
      this.productData = data;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ProductService} from '../product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

   product: any;
   link: any;
  constructor(private svc: ProductService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getProductDetails();
  }

  getProductDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.svc.getProductById(id).subscribe(data => {
      this.product = data.data;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Collection } from '@app/core/types/collection';
import { Product } from '@app/core/types/product';
import { PersistenceService } from '@app/core/persistence.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@app/shop/product/product.service';


@Component({
  selector: 'products',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  isLoading: boolean;
  collectionData: any = [];
  collectionParentData: any[] = [];
  productData: any = [];
  activeCollectionId: number;
  private apiUrl: string;

  constructor(private svc: ProductService,
    private persistenceService: PersistenceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.apiUrl = persistenceService.apiUrl;
    this.route.queryParams.subscribe(params => {
      this.activeCollectionId = parseInt(params['id']);
    });
  }

  ngOnInit() {
    this.isLoading = true;

    this.svc.getAllCollections().subscribe(data => {
      this.collectionData = data;
      const activeCollection = this.collectionData.find((x: any) => x.id === this.activeCollectionId);
    });

    this.svc.getProducts().subscribe(data => {
      this.productData = data;
    });
  }



  getCollectionById(id: number) {
    if (this.collectionData.length > 0 && id > 0) {
      return this.collectionData.find((x: any) => x.categoryId === id);
    }
  }

  getProductsByCollection(id: number) {
    if (this.productData.length > 0 && id > 0) {
      return this.productData.filter((x: any) => x.collectionId === id);
    } else {
      return [];
    }
  }

  goTo(collection: Collection) {
    this.router.navigate(['/collections'], { queryParams: { id: collection.id } });
  }

  goToProducts(collection: Collection) {
    this.router.navigate(['/products/list'], { queryParams: { id: collection.id } });
  }

  goToProduct(product: Product) {
    this.router.navigate(['/product/' + product.id]);
  }

}

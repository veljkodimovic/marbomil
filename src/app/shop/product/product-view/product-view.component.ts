import { NgModule, Component, Renderer, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { PersistenceService } from '@app/core/persistence.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Product } from '@app/core/types/product';
import { Collection } from '@app/core/types/collection';
import { Category } from '@app/core/types/category';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  collections: Collection[] = [];
  categories: Category[] = [];
  product: Product;
  productCategory: Category;
  productCollection: Collection;
  productCollectionMain: Collection;
  apiUrl: string;
  activeImage: string;

  constructor(private svc: ProductService, private renderer: Renderer,
    private persistenceService: PersistenceService,
    private router: Router,
    private route: ActivatedRoute) {
      this.apiUrl = persistenceService.apiUrl;
  }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    this.svc.getProductById(parseInt(id)).subscribe(data => {
      this.product = data;
      const that = this;
      const images = this.product.images;
      this.activeImage = this.apiUrl + '/' + images[0].imageUrl;
      images.forEach(function (image: any) {
        const imageUrl = that.apiUrl + '/' + image.imageUrl;
        console.log(imageUrl);
      });


      this.svc.getCategoryById(this.product.categoryId).subscribe(dataCat => {
        this.productCategory = dataCat;
      });
      this.svc.getCollectionById(this.product.collectionId).subscribe(dataColl => {
        this.productCollectionMain = dataColl;
      });
    });

    this.svc.getAllCollections().subscribe((data: any) => {
      this.collections = data;
    });

    this.svc.getAllCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }

  goTo(collection: Collection) {
    this.router.navigate(['/collections'], { queryParams: { id: collection.id } });
  }

  goToProducts(collection: Collection) {
    this.router.navigate(['/products/list'], { queryParams: { id: collection.id } });
  }

  setActive(productImage: any) {
    this.activeImage = this.apiUrl + '/' + productImage.imageUrl;
  }

}

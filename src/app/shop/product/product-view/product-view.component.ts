import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { PersistenceService } from '@app/core/persistence.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Product, Dimension } from '@app/core/types/product';
import { Collection } from '@app/core/types/collection';
import { Category } from '@app/core/types/category';
import { AuthenticationService } from '@app/core';

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
  quantity = 0;
  isLoading: boolean;
  selectedDimension: Dimension;

  constructor(private svc: ProductService,
    private persistenceService: PersistenceService,
    private router: Router,
    private authService: AuthenticationService,
    private productService: ProductService,
    private route: ActivatedRoute) {
    this.apiUrl = this.persistenceService.apiUrl;
  }

  ngOnInit() {
    this.isLoading = true;
    const id = this.route.snapshot.paramMap.get('id');
    this.svc.getProductById(Number(id)).subscribe(data => {
      this.product = data;
      this.product.count = 1;
      this.selectedDimension = this.product.dimensions ? this.product.dimensions[0] : new Dimension();
      if (this.selectedDimension) {
        this.setPrice();
      }
      const that = this;
      const images = this.product.images;
      const imgUrl = images[0] && images[0].imageUrl ? images[0].imageUrl : null;
      this.activeImage = imgUrl ? this.apiUrl + '/' + images[0].imageUrl : null;
      images.forEach(function (image: any) {
        const imageUrl = that.apiUrl + '/' + image.imageUrl;
      });


      this.svc.getCategoryById(this.product.categoryId).subscribe(dataCat => {
        this.productCategory = dataCat;
      });
      this.svc.getCollectionById(this.product.collectionId).subscribe(dataColl => {
        this.productCollectionMain = dataColl;
        this.isLoading = false;
      });
    });

    this.svc.getAllCollections().subscribe((data: any) => {
      this.collections = data;
    });

    this.svc.getAllCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }

  setPrice() {
    this.product.price = this.selectedDimension.price;
    this.product.dimension = this.selectedDimension.dimension;
  }

  goTo(collection: Collection) {
    this.router.navigate(['/collections'], { queryParams: { id: collection.id } });
  }

  goToProducts(collection: Collection, categoryId: number) {
    this.router.navigate(['/products/list'], { queryParams: { id: collection.id, categoryId: categoryId } });
  }

  setActive(productImage: any) {
    this.activeImage = this.apiUrl + '/' + productImage.imageUrl;
  }

  isAuth() {
    return this.authService.isAuthenticated();
  }

  addToCart(product: Product) {
    this.productService.addToCart(product);
  }

}

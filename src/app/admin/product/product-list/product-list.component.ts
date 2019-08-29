import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../../core/types/product';
import { Category } from '../../../core/types/category';
import { DeleteModalComponent } from '../../../shared/delete-modal/delete-modal';
import { CollectionService } from '../../collections/collections.service';
import { Collection } from '@app/core/types/collection';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';

class CollectionView {
  id: number;
  title: string;
  products: Product[];

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
    this.products = [];
  }
}

class CategoryView {
  id: number;
  title: string;
  collectionViews: CollectionView[];

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
    this.collectionViews = [];
  }
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @ViewChild(DeleteModalComponent)
  private modal: DeleteModalComponent;
  private apiUrl: string;
  productData: any;
  products: any;
  activeProduct: Product;
  categories: Category[] = [];
  activeCategory: Category;
  activeCategoryId: number;
  allCollections: Collection[];
  collections: Collection[];
  categoryViews: CategoryView[] = [];
  collectionViews: CollectionView[] = [];
  activeCollectionId: number;
  isLoading: boolean;
  productsOutOfCollections: any = this.translateService.get('Products Out Of Collections');
  unknownCategory: any = this.translateService.get('Unknown category');
  constructor(private svc: ProductService,
    private collectionsService: CollectionService,
    private translateService: TranslateService,
    private route: ActivatedRoute
  ) {
    this.apiUrl = environment.serverUrl;
  }

  ngOnInit() {
    this.isLoading = true;
    this.getProductData();
  }

  getProductData() {
    this.svc.getProducts().subscribe(data => {
      this.svc.getAllCategories().subscribe((cat: any) => {
        this.categories = cat;
        this.collectionsService.getAllCollections().subscribe((collData: Collection[]) => {
          this.allCollections = collData;
          this.route.queryParams.subscribe(params => {
            this.activeCollectionId = Number(params['collectionId']);
            this.activeCategoryId = Number(params['categoryId']);
            this.productData = data;
            this.productData.sort(function (a: any, b: any) {
              const i = a.orderNumber > 0 ? a.orderNumber : 9999999;
              const j = b.orderNumber > 0 ? b.orderNumber : 9999999;
              return i - j;
            });
            this.products = this.productData;
            this.updateProducts();
          });
        });
      });
    });
  }

  getCollectionNameById(collectionId: number): string {
    // tslint:disable-next-line:max-line-length
    return this.allCollections.find((c: Collection) => c.id === collectionId) ? this.allCollections.find((c: Collection) => c.id === collectionId).title : this.productsOutOfCollections.value;
  }

  getCategoryNameById(categoryId: number): string {
    // tslint:disable-next-line:max-line-length
    return this.categories.find((c: Collection) => c.id === categoryId) ? this.categories.find((c: Collection) => c.id === categoryId).title : this.unknownCategory.value;
  }

  devideProductsByCollection() {
    this.categoryViews = [];
    this.products.forEach((p: Product) => {
      const tmpCat: CategoryView = this.categoryViews.find(cw => cw.id === p.categoryId);
      if (!tmpCat) {
        this.categoryViews.push(new CategoryView(p.categoryId, this.getCategoryNameById(p.categoryId)));
      }
    });
    this.categoryViews.forEach(cw => {
      const categoryProducts = this.products.filter((p: Product) => p.categoryId === cw.id);
      categoryProducts.forEach((cp: Product) => {
        const tmpColl: CollectionView = cw.collectionViews.find(colw => colw.id === cp.collectionId);
        if (!tmpColl) {
          cw.collectionViews.push(new CollectionView(cp.collectionId, this.getCollectionNameById(cp.collectionId)));
        }
      });
    });
    this.products.forEach((p: Product) => {
      this.categoryViews.forEach(cw => {
        cw.collectionViews.forEach(colw => {
          if (colw.id === p.collectionId) {
            colw.products.push(p);
          }
        });
      });
    });
    this.isLoading = false;
  }

  openModal(product: Product) {
    this.activeProduct = product;
    this.modal.openModal();
  }

  performDelete(event: any) {
    this.svc.deleteProduct(this.activeProduct.id).subscribe(res => {
      this.getProductData();
    });
  }

  updateProducts(categorySelect?: boolean) {
    if (categorySelect) {
      this.activeCollectionId = null;
    }
    const categoryId = this.activeCategoryId;
    const collectionId = this.activeCollectionId;
    this.products = this.productData;
    this.collections = this.allCollections.filter((c: Collection) => c.categoryId === this.activeCategoryId);
    if (categoryId > 0) {
      this.products = this.products.filter((x: any) => x.categoryId === categoryId);
      if (collectionId > 0) {
        this.products = this.products.filter((p: Product) => p.collectionId === this.activeCollectionId);
      }
    }
    this.devideProductsByCollection();
  }

}

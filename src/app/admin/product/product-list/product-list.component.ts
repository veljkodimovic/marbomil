import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Product } from '../../../core/types/product';
import { Category } from '../../../core/types/category';
import { PersistenceService } from '@app/core/persistence.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from '../../../shared/delete-modal/delete-modal';
import { CollectionService } from '../../collections/collections.service';
import { Collection } from '@app/core/types/collection';

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
  collections: Collection[];
  categoryViews: CategoryView[] = [];
  collectionViews: CollectionView[] = [];
  constructor(private svc: ProductService,
    private collectionsService: CollectionService,
    private persistenceService: PersistenceService,
    private router: Router
  ) {
    this.apiUrl = persistenceService.apiUrl;
  }

  ngOnInit() {
    this.getProductData();
    this.svc.getAllCategories().subscribe((data: any) => {
      this.categories = data;
    });
    this.collectionsService.getAllCollections().subscribe((data: Collection[]) => {
      this.collections = data;
    });
  }

  getProductData() {
    this.svc.getProducts().subscribe(data => {
      this.productData = data;
      this.productData.sort(function (a: any, b: any) {
        const i = a.orderNumber > 0 ? a.orderNumber : 9999999;
        const j = b.orderNumber > 0 ? b.orderNumber : 9999999;
        return i - j;
      });
      this.products = this.productData;
      this.updateProducts();
    });
  }

  getCollectionNameById(collectionId: number): string {
    // tslint:disable-next-line:max-line-length
    return this.collections.find((c: Collection) => c.id === collectionId) ? this.collections.find((c: Collection) => c.id === collectionId).title : 'Unknown Collection';
  }

  getCategoryNameById(categoryId: number): string {
    // tslint:disable-next-line:max-line-length
    return this.categories.find((c: Collection) => c.id === categoryId) ? this.categories.find((c: Collection) => c.id === categoryId).title : 'Unknown Category';
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

  updateProducts() {
    const categoryId = this.activeCategoryId;
    this.products = this.productData;
    if (categoryId > 0) {
      this.products = this.products.filter((x: any) => x.categoryId === categoryId);
    }
    this.devideProductsByCollection();
  }

}

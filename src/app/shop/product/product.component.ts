import { Component, OnInit } from '@angular/core';
import { Collection } from '@app/core/types/collection';
import { Category } from '@app/core/types/category';
import { Product } from '@app/core/types/product';
import { PersistenceService } from '@app/core/persistence.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@app/shop/product/product.service';


@Component({
  selector: 'app-products',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  isLoading: boolean;
  collectionData: any = [];
  collectionsAll: any = [];
  categoryData: Category[];
  productData: any = [];
  activeCollectionId: number;
  activeCategoryId: any;
  private apiUrl: string;

  constructor(private svc: ProductService,
    private persistenceService: PersistenceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.apiUrl = persistenceService.apiUrl;
    this.route.queryParams.subscribe(params => {
      this.activeCollectionId = Number(params['id']);
      this.activeCategoryId = Number(params['categoryId']);
    });
  }

  ngOnInit() {
    this.isLoading = true;

    if (this.activeCollectionId) {
      this.svc.getAllCollections().subscribe(data => {
        this.collectionData = data;
        this.collectionsAll = data;
        const activeCollection = this.collectionData.find((x: any) => x.id === this.activeCollectionId);
        this.activeCategoryId = activeCollection.categoryId;
      });
    } else {
      this.svc.getAllCollections().subscribe(data => {
        this.collectionsAll = data;
      });
    }

    this.svc.getAllCategories().subscribe(data => {
      this.categoryData = data;
    });

    this.svc.getProducts().subscribe(data => {
      this.productData = data;
      this.productData.sort(function(a: any, b: any) {
        const i = a.orderNumber > 0 ? a.orderNumber : 9999999;
        const j = b.orderNumber > 0 ? b.orderNumber : 9999999;
        return i - j;
      });
    });
  }

  getCollectionsById(id: number) {
    if (this.collectionsAll.length > 0 && id > 0) {
      return this.collectionsAll.filter((x: any) => x.categoryId === id);
    }
    return [];
  }

  getCollectionById(id: number) {
    if (this.collectionsAll.length > 0 && id > 0) {
      return this.collectionsAll.find((x: any) => x.categoryId === id);
    }
  }

  getProductsByParent() {
    if (this.activeCollectionId) {
      if (this.productData.length > 0) {
        return this.productData.filter((x: any) => x.collectionId === this.activeCollectionId);
      } else {
        return [];
      }
    } else if (this.activeCategoryId) {
      if (this.productData.length > 0) {
        return this.productData.filter((x: any) => x.categoryId === this.activeCategoryId);
      } else {
        return [];
      }
    } else {
      return this.productData;
    }
  }

  goTo(collection: Collection) {
    this.router.navigate(['/collections'], { queryParams: { id: collection.id } });
  }

  goToProducts(collection: Collection, categoryId: number) {
    this.router.navigate(['/products/list'], { queryParams: { id: collection.id, categoryId: categoryId } });
  }

  goToProduct(product: Product) {
    this.router.navigate(['/product/' + product.id]);
  }

  goToCategory(category: Category) {
    const categoryCount = this.getCollectionsById(category.id);
    if (categoryCount.length) {
      this.router.navigate(['/categories/' + category.id]);
      this.activeCategoryId = category.id;
    } else {
      this.router.navigate(['/products/list'], { queryParams: { categoryId: category.id } });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Collection } from '@app/core/types/collection';
import { Category } from '@app/core/types/category';
import { Product } from '@app/core/types/product';
import { PersistenceService } from '@app/core/persistence.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@app/shop/product/product.service';
import { AuthenticationService } from '@app/core';
import { CategoryService } from '../categories/categories.service';


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
  private isAuth: boolean;
  counts: number[] = [];
  activeCategory: Category;
  menuData: any[];

  constructor(private svc: ProductService,
    private categorySvc: CategoryService,
    private persistenceService: PersistenceService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.isAuth = this.authService.isAuthenticated();
    this.apiUrl = this.persistenceService.apiUrl;

  }

  ngOnInit() {
    this.isLoading = true;
    this.route.queryParams.subscribe(params => {
      this.activeCollectionId = Number(params['id']);
      this.activeCategoryId = Number(params['categoryId']);
      this.categorySvc.getMenuStructure().subscribe((menuData: any[]) => {
        this.menuData = menuData;
        this.getProductsByCollectionId(this.activeCollectionId);
      });
    });
  }

  getProductsByCollectionId(collectionId: number) {
    this.svc.getProductsByCollectionId(collectionId).subscribe((products: Product[]) => {
      this.productData = products;
      this.productData.forEach((product: any) => {
        product.count = 1;
      });
      this.productData.sort(function (a: any, b: any) {
        const i = a.orderNumber > 0 ? a.orderNumber : 9999999;
        const j = b.orderNumber > 0 ? b.orderNumber : 9999999;
        return i - j;
      });
    });
  }

  // getCollectionsById(id: number) {
  //   this.svc.getCollectionsByCategoryId(id).subscribe((collections: Collection[]) => {
  //     this.collections = collections;
  //     this.svc.getProductsNotCollectionAssigned(id).subscribe((products: Product[]) => {
  //       this.products = products;
  //       this.products.forEach((product: any) => {
  //         product.count = 1;
  //       });
  //     });
  //   });
  // }
  // this.isLoading = true;

  // if (this.activeCollectionId) {
  //   this.svc.getAllCollections().subscribe(data => {
  //     this.collectionData = data;
  //     this.collectionsAll = data;
  //     const activeCollection = this.collectionData.find((x: any) => x.id === this.activeCollectionId);
  //     this.activeCategoryId = activeCollection.categoryId;
  //   });
  // } else {
  //   this.svc.getAllCollections().subscribe(data => {
  //     this.collectionsAll = data;
  //   });
  // }

  // this.svc.getAllCategories().subscribe(data => {
  //   this.categoryData = data;
  //   this.activeCategory = this.categoryData.find(c => c.id === this.activeCategoryId);
  // });

  // this.svc.getProducts().subscribe(data => {
  //   this.productData = data;
  //   this.productData.forEach((product: any) => {
  //     product.count = 1;
  //   });
  //   this.productData.sort(function (a: any, b: any) {
  //     const i = a.orderNumber > 0 ? a.orderNumber : 9999999;
  //     const j = b.orderNumber > 0 ? b.orderNumber : 9999999;
  //     return i - j;
  //   });
  // });

  goToProducts(collection: Collection, categoryId: number) {
    this.router.navigate(['/products/list'], { queryParams: { id: collection.id, categoryId: categoryId } });
  }

  goToProduct(product: Product) {
    this.router.navigate(['/product/' + product.id]);
  }

  goToCategory(category: any) {
    this.router.navigate(['/categories/' + category.id]);
  }

  addToCart(product: any) {
    this.svc.addToCart(product);
  }
}

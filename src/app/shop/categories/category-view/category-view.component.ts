import { Component, OnInit } from '@angular/core';
import { Category } from '@app/core/types/category';
import { Collection } from '@app/core/types/collection';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '@app/shop/categories/categories.service';
import { environment } from '@env/environment';
import { Product } from '@app/core/types/product';
import { AuthenticationService } from '@app/core';
import { ProductService } from '@app/shop/product/product.service';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.scss']
})
export class CategoryViewComponent implements OnInit {

  isLoading: boolean;
  apiUrl: string;
  collections: Collection[] = [];
  products: Product[] = [];
  activeCategoryId: any;
  menuData: any[] = [];
  private isAuth: boolean;
  counts: number[] = [];

  constructor(private svc: CategoryService,
    private router: Router,
    private route: ActivatedRoute, private authService: AuthenticationService,
    private productsService: ProductService) {
    this.apiUrl = environment.serverUrl;
    this.isAuth = this.authService.isAuthenticated();
  }


  ngOnInit() {
    this.isLoading = true;
    this.activeCategoryId = Number(this.route.snapshot.paramMap.get('id'));
    this.svc.getMenuStructure().subscribe((menuData: any[]) => {
      this.menuData = menuData;
      this.getCollectionsById(this.activeCategoryId);
    });
  }

  getCollectionsById(id: number) {
    this.isLoading = true;
    this.svc.getCollectionsByCategoryId(id).subscribe((collections: Collection[]) => {
      this.collections = collections;
      this.svc.getProductsNotCollectionAssigned(id).subscribe((products: Product[]) => {
        this.products = products;
        this.products.forEach((product: any) => {
          product.count = 1;
        });
        this.isLoading = false;
      });
    });
  }

  goToCollection(collection: Collection) {
    this.router.navigate(['/collections'], { queryParams: { id: collection.id } });
  }

  goToCategory(category: any) {
      this.router.navigate(['/categories/' + category.id]);
      this.activeCategoryId = category.id;
      this.getCollectionsById(category.id);
  }

  goToCategoryHome() {
    this.router.navigate(['/categories']);
  }

  goToProducts(collection: Collection, categoryId: number) {
    this.router.navigate(['/products/list'], { queryParams: { id: collection.id, categoryId: categoryId } });
  }

  goToProduct(product: Product) {
    this.router.navigate([`/product/${product.id}`]);
  }

  addToCart(product: any) {
    this.productsService.addToCart(product);
  }

}

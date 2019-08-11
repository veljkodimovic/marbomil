import { Component, OnInit } from '@angular/core';
import { SearchResultsService } from './search-results.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@env/environment';
import { Category } from '@app/core/types/category';
import { Collection } from '@app/core/types/collection';
import { AuthenticationService } from '@app/core';
import { Product } from '@app/core/types/product';
import { ProductService } from '@app/shop/product/product.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  searchParam: string;
  isLoading: boolean;
  apiUrl: string;
  isAuth: boolean;
  counts: number[] = [];
  searchResults: any = {
    categories: [],
    collections: [],
    products: []
  };

  constructor(private searchResultsService: SearchResultsService,
    private productService: ProductService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router) {
    this.apiUrl = environment.serverUrl;
    this.isAuth = this.authService.isAuthenticated();
    this.searchResultsService.searchEvent.subscribe(() => {
      this.doSearch(this.searchResultsService.param);
    });
  }

  ngOnInit() {
    this.isLoading = true;
    if (!this.searchResultsService.param) {
      this.doSearch(this.route.snapshot.paramMap.get('param'));
    } else {
      this.doSearch(this.searchResultsService.param);
    }
  }

  doSearch(param: string) {
    this.isLoading = true;
    this.searchParam = param;
    this.searchResultsService.search(param).subscribe((results: any) => {
      this.searchResults = JSON.parse(results._body);
      this.searchResults.products.forEach((product: any) => {
        product.count = 1;
      });
      this.isLoading = false;
    });
  }

  goToCategory(category: Category) {
    this.router.navigate(['/categories/' + category.id]);
  }

  goToCollection(collection: Collection) {
    this.router.navigate(['/products/list'], { queryParams: { id: collection.id, categoryId: collection.categoryId } });
  }

  goToProduct(product: Product) {
    this.router.navigate(['/product/' + product.id]);
  }

  addToCart(product: any) {
    this.productService.addToCart(product);
  }

}

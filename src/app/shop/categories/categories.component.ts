import { Component, OnInit } from '@angular/core';
import { Category } from '@app/core/types/category';
import { Collection } from '@app/core/types/collection';
import { Router } from '@angular/router';
import { CategoryService } from '@app/shop/categories/categories.service';
import { environment } from '@env/environment.prod';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categoryData: Category[];
  apiUrl: string;
  isLoading: boolean;

  constructor(private svc: CategoryService,
    private router: Router
  ) {
    this.apiUrl = environment.serverUrl;
  }


  ngOnInit() {
    this.isLoading = true;
    this.svc.getAllCategories().subscribe(data => {
      this.categoryData = data;
      this.isLoading = false;
    });
  }

  goTo(category: Category) {
    this.svc.getCollectionsByCategoryId(category.id).subscribe((data: Collection[]) => {
      if (data.length) {
        this.router.navigate(['/categories/' + category.id]);
      } else {
        this.router.navigate(['/products/list'], { queryParams: { categoryId: category.id } });
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Category } from '@app/core/types/category';
import { PersistenceService } from '@app/core/persistence.service';
import { Collection } from '@app/core/types/collection';
import { finalize } from 'rxjs/operators';
import {Router} from '@angular/router';
import { CategoryService } from '@app/shop/categories/categories.service';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  isLoading: boolean;
  categoryData: Category[];
  collectionData: any = [];
  private apiUrl: string;

  constructor(private svc: CategoryService,
    private persistenceService: PersistenceService,
              private router: Router
  ) {
    this.apiUrl = persistenceService.apiUrl;
  }


  ngOnInit() {
    this.isLoading = true;
    const categoryAllData = {};

    this.svc.getAllCategories().subscribe(data => {
      this.categoryData = data;
    });
    this.svc.getAllCollections().subscribe(data => {
      this.collectionData = data;
    });
  }

  getCollectionsById(id: number) {
    if (this.collectionData.length > 0 && id > 0) {
      return this.collectionData.filter((x: any) => x.categoryId === id);
    }
  }

  goTo(category: Category) {
    const categoryCount = this.getCollectionsById(category.id);
    if (categoryCount.length) {
      this.router.navigate(['/categories/' + category.id]);
    } else {
      this.router.navigate(['/products/list'], { queryParams: { categoryId: category.id } });
    }
  }

}

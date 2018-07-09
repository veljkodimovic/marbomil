import { Component, OnInit } from '@angular/core';
import { Category } from '@app/core/types/category';
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

  constructor(private svc: CategoryService,
              private router: Router
  ) { }


  ngOnInit() {
    this.isLoading = true;
    const categoryAllData = {};

    this.svc.getAllCollections().subscribe(data => {
      this.collectionData = data;
      this.collectionData = this.collectionData.filter((x: any) => x.parentId === null);
    });

    this.svc.getAllCategories().subscribe(data => {
      this.categoryData = data;
    });
  }

  getCollectionsById(id: number) {
    if (this.collectionData.length > 0 && id > 0) {
      return this.collectionData.filter((x: any) => x.categoryId === id);
    }
  }

  goTo(collection: Collection) {
    this.router.navigate(['/collections'], { queryParams: { id: collection.id } });
  }

}

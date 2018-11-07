import { Component, OnInit, Renderer } from '@angular/core';
import { Category } from '@app/core/types/category';
import { Collection } from '@app/core/types/collection';
import { PersistenceService } from '@app/core/persistence.service';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '@app/shop/categories/categories.service';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.scss']
})
export class CategoryViewComponent implements OnInit {

  isLoading: boolean;
  categoryData: Category[];
  collectionData: any = [];
  activeCategoryId: any;
  private apiUrl: string;

  constructor(private svc: CategoryService, private renderer: Renderer,
    private persistenceService: PersistenceService,
    private router: Router,
    private route: ActivatedRoute) {
      this.apiUrl = persistenceService.apiUrl;
    this.activeCategoryId = parseInt(this.route.snapshot.paramMap.get('id'));
  }


  ngOnInit() {
    this.isLoading = true;
    const categoryAllData = {};

    this.svc.getAllCollections().subscribe(data => {
      this.collectionData = data;
      this.collectionData = this.collectionData.filter((x: any) => x.parentCollectionId === null);
    });

    this.svc.getAllCategories().subscribe(data => {
      this.categoryData = data;
    });
  }

  getCollectionsById(id: number) {
    if (this.collectionData.length > 0 && id > 0) {
      return this.collectionData.filter((x: any) => x.categoryId === id);
    }
    return [];
  }

  goToCollection(collection: Collection) {
    this.router.navigate(['/collections'], { queryParams: { id: collection.id } });
  }

  goToCategory(category: Category) {
    this.router.navigate(['/categories/' + category.id]);
    this.activeCategoryId = category.id;
  }

  goToCategoryHome() {
    this.router.navigate(['/categories']);
  }

}

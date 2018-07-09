import { Component, OnInit } from '@angular/core';
import { Category } from '@app/core/types/category';
import { Collection } from '@app/core/types/collection';
import { ActivatedRoute, Router} from '@angular/router';
import { CollectionService } from '@app/shop/collections/collections.service';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {

  isLoading: boolean;
  categoryData: Category[];
  collectionData: any = [];
  activeCollectionId: number;

  constructor(private svc: CollectionService,
              private router: Router,
              private route: ActivatedRoute
  ) {
      this.route.queryParams.subscribe(params => {
        this.activeCollectionId = parseInt(params['id']);
      });
  }

  ngOnInit() {
    this.isLoading = true;

    this.svc.getAllCollections().subscribe(data => {
      this.collectionData = data;
    });

    this.svc.getAllCategories().subscribe(data => {
      this.categoryData = data;
    });
  }

  getCollectionsById(id: number) {
    if (this.collectionData.length > 0 && id > 0) {
      return this.collectionData.filter((x: any) => x.parentId === id);
    } else {
      return [];
    }
  }

  getCollectionsByCatId(id: number) {
    if (this.collectionData.length > 0 && id > 0) {
      return this.collectionData.filter((x: any) => x.categoryId === id && x.parentId === null);
    } else {
      return [];
    }
  }

  getCollectionById(id: number) {
    if (this.collectionData.length > 0 && id > 0) {
      return this.collectionData.find((x: any) => x.categoryId === id);
    }
  }

  goTo(collection: Collection) {
    this.router.navigate(['/collections'], { queryParams: { id: collection.id } });
  }

  goToProduct(collection: Collection) {
    this.router.navigate(['/products/list'], { queryParams: { id: collection.id } });
  }

}

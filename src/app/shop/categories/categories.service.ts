import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { PersistenceService } from '@app/core/persistence.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const routes = {
  category: () => `/category/`,
  collectionsbycategoryid: () => `/collection/category/`,
  categorycollectionsincluded: () => `/category/collectionsincluded`,
  productsnotcollectionassigned: () => `/product/category/notcollectionassigned/`
};

@Injectable()
export class CategoryService {

  constructor(private http: Http, private persistenceService: PersistenceService) {

  }

  getMenuStructure(): Observable<any[]> {
    return this.http.get(routes.categorycollectionsincluded())
      .map((res: Response) => res.json())
      .map(body =>
        body)
      .catch(err => this.persistenceService.handleError(err));
  }

  getAllCategories(): Observable<any[]> {
    return this.http.get(routes.category())
      .map((res: Response) => res.json())
      .map(body =>
        body)
      .catch(err => this.persistenceService.handleError(err));
  }

  getCollectionsByCategoryId(categoryId: number): Observable<any[]> {
    return this.http.get(`${routes.collectionsbycategoryid()}${categoryId}`)
      .map((res: Response) => res.json())
      .map(body =>
        body)
      .catch(err => this.persistenceService.handleError(err));
  }

  getProductsNotCollectionAssigned(categoryId: number): Observable<any[]> {
    return this.http.get(`${routes.productsnotcollectionassigned()}${categoryId}`)
      .map((res: Response) => res.json())
      .map(body =>
        body)
      .catch(err => this.persistenceService.handleError(err));
  }

}

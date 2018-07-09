import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { PersistenceService } from '@app/core/persistence.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const routes = {
  collection: () => `/collection/`,
  category: () => `/category/`,
  products: () => `/products/`
};

@Injectable()
export class ProductService {

  headers: Headers;
  constructor(private http: Http, private persistenceService: PersistenceService) {

  }

  getProducts(): Observable<any> {
    return this.http.get(routes.products())
      .map((res: Response) => res.json())
      .map(body =>
        body)
      .catch(err => this.persistenceService.handleError(err));
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(routes.products() + id)
      .map((res: Response) => res.json())
      .map(body =>
        body)
      .catch(err => this.persistenceService.handleError(err));
  }

  // Categories region
  getAllCategories(): Observable<any[]> {

    return this.http.get(routes.category())
      .map((res: Response) => res.json())
      .map(body =>
        body)
      .catch(err => this.persistenceService.handleError(err));
  }

  getCategoryById(id: number): Observable<any> {

    return this.http.get(routes.category() + id)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch((err) => this.persistenceService.handleError(err));
  }

  getAllCollections(): Observable<any[]> {

    return this.http.get(routes.collection())
      .map((res: Response) => res.json())
      .map(body =>
        body)
      .catch(err => this.persistenceService.handleError(err));
  }

  getCollectionById(id: number): Observable<any> {

    return this.http.get(routes.collection() + id)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch((err) => this.persistenceService.handleError(err));
  }

}

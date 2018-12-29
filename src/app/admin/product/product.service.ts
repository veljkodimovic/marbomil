import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../core/types/product';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { PersistenceService } from '../../core/persistence.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const routes = {
  products: () => `/product/`,
  collection: () => `/collection/`,
  category: () => `/category/`
};

@Injectable()
export class ProductService {

  activeProduct: Product;
  headers: Headers;
  collectionData: any = [];
  options: any;

  constructor(private http: Http,
    private persistenceService: PersistenceService) {
      this.options = this.persistenceService.getApiHeader();
     }


  getProducts(): Observable<any> {
    return this.http.get(routes.products())
      .map((res: Response) => res.json())
      .map(body => body)
      .catch(err => this.persistenceService.handleError(err));
  }

  //collection region
  getAllCollections(): Observable<any> {

    return this.http.get(routes.collection())
      .map((res: Response) => res.json())
      .map(body => body)
      .catch(err => this.persistenceService.handleError(err));
  }

  getAllCategories(): Observable<any> {
    return this.http.get(routes.category())
      .map((res: Response) => res.json())
      .catch(err => this.persistenceService.handleError(err));
  }

  getProductById(id: number): Observable<any> {

    return this.http.get(routes.products() + id)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch((err) => this.persistenceService.handleError(err));
  }

  getProductEditById(id: number): Observable<any> {
    return this.http.get(routes.products() + 'edit/' + id, this.options)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch((err) => this.persistenceService.handleError(err));
  }

  getProductImageByID(id: number): Observable<any> {
    return this.http.get(routes.products() + 'edit/image/' + id, this.options)
    .map((res: Response) => res.json())
    .map(body => body)
    .catch((err) => this.persistenceService.handleError(err));
  }

  createProduct(body: Product): Observable<any> {
    //let bodyString = JSON.stringify(body);

    return this.http.post(routes.products(), body, this.options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  updateProduct(body: Product): Observable<any> {
    //let bodyString = JSON.stringify(body);

    return this.http.put(routes.products(), body, this.options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  deleteProduct(id: number): Observable<any> {

    return this.http.delete(routes.products() + id, this.options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

}

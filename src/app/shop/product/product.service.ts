import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { PersistenceService } from '@app/core/persistence.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { NotificationsService } from 'angular2-notifications';
import { TranslateService } from '@ngx-translate/core';

const routes = {
  collection: () => `/collection/`,
  category: () => `/category/`,
  products: () => `/product/`
};

@Injectable()
export class ProductService {

  headers: Headers;
  success: any = this.translate.get('Success');
  added: any = this.translate.get('Product successfully added to cart');
  constructor(private http: Http, private persistenceService: PersistenceService, private notifications: NotificationsService, private translate: TranslateService) {

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

  addToCart(product: any): void {
    let myCart = JSON.parse(sessionStorage.getItem('my-cart'));
    // tslint:disable-next-line:max-line-length
    myCart ? myCart.orders.push({ id: product.id, count: product.count }) : myCart = { orders: [{ id: product.id, count: product.count }] };
    sessionStorage.setItem('my-cart', JSON.stringify(myCart));
    this.notifications.success(this.success.value, this.added.value,
      {
        timeOut: 1000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 100
      });
  }

}

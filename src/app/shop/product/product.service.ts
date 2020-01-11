import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { PersistenceService } from '@app/core/persistence.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { NotificationsService } from 'angular2-notifications';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from '@app/core/shell/header/header.service';
import { Product } from '@app/core/types/product';

const routes = {
  collection: () => `/collection/`,
  category: () => `/category/`,
  products: () => `/product/`,
  productsbycollection: () => `/product/collection/`,
  productsbycategorynotcollectionassigned: () => `/product/category/notcollectionassigned/`
};

@Injectable()
export class ProductService {

  headers: Headers;
  success: any = this.translate.get('Success');
  added: any = this.translate.get('Product successfully added to cart');
  constructor(private http: Http,
    private persistenceService: PersistenceService,
    private notifications: NotificationsService,
    private translate: TranslateService,
    private headerService: HeaderService) {

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

  addToCart(product: Product): void {
    let myCart = JSON.parse(sessionStorage.getItem('my-cart'));
    // tslint:disable-next-line:max-line-length
    if (myCart) {
      // const item: Product = myCart.orders.find((p: Product) => p.id === product.id);
      myCart.orders.push(product);
    } else {
      myCart = { orders: [product] };
    }



    // myCart ? myCart.orders.push(product) : myCart = { orders: [product] };
    sessionStorage.setItem('my-cart', JSON.stringify(myCart));
    this.headerService.shoppingCartItemsCount.emit(product.count);
    this.notifications.success(this.success.value, this.added.value,
      {
        timeOut: 1000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 100
      });
  }

  getProductsByCollectionId(collectionId: number): Observable<Product[]> {
    return this.http.get(`${routes.productsbycollection()}${collectionId}`)
      .map((res: Response) => res.json())
      .map(body =>
        body)
      .catch(err => this.persistenceService.handleError(err));
  }

  getProductsNotCollectionAssignedByCategoryId(categoryId: number): Observable<Product[]> {
    return this.http.get(`${routes.productsbycategorynotcollectionassigned()}${categoryId}`)
      .map((res: Response) => res.json())
      .map(body =>
        body)
      .catch(err => this.persistenceService.handleError(err));
  }

}

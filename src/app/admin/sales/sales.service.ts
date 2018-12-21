import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Sales } from '@app/core/types/sales';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { PersistenceService } from '../../core/persistence.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const routes = {
  sales: () => `/sales/`
};

const credentialsKey = 'credentials';
const storageLocal = JSON.parse(localStorage.getItem(credentialsKey));
const storageSession = JSON.parse(sessionStorage.getItem(credentialsKey));
let accessToken = '';
if (storageSession) {
  accessToken = storageSession.accessToken;
} else if (storageLocal) {
  accessToken = storageLocal.accessToken;
}
const headers = new Headers({
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + accessToken
});
const options = new RequestOptions({ headers: headers });

@Injectable()
export class SalesService {

  activeSales: Sales;
  headers: Headers;
  constructor(private http: Http, private persistenceService: PersistenceService) {

  }

  // Sales region
  getAllSales(): Observable<any[]> {
    return this.http.get(routes.sales())
      .map((res: Response) => res.json())
      .map(body =>
        body)
      .catch(err => this.persistenceService.handleError(err));
  }

  getSalesById(id: number): Observable<any> {

    return this.http.get(routes.sales() + id, options)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch((err) => this.persistenceService.handleError(err));
  }

  createSales(body: Sales): Observable<any> {
    // let bodyString = JSON.stringify(body);

    return this.http.post(routes.sales(), body, options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  updateSales(body: Sales): Observable<any> {
    // let bodyString = JSON.stringify(body);

    return this.http.put(routes.sales(), body, options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  deleteSales(id: number): Observable<any> {

    return this.http.delete(routes.sales() + id, options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  // end of sales

}

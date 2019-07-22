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

@Injectable()
export class SalesService {

  activeSales: Sales;
  headers: Headers;
  options: any;
  constructor(private http: Http, private persistenceService: PersistenceService) {
    this.options = this.persistenceService.getApiHeader();
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
    this.options = this.persistenceService.getApiHeader();
    return this.http.get(routes.sales() + id, this.options)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch((err) => this.persistenceService.handleError(err));
  }

  createSales(body: Sales): Observable<any> {
    // let bodyString = JSON.stringify(body);
    this.options = this.persistenceService.getApiHeader();
    return this.http.post(routes.sales(), body, this.options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  updateSales(body: Sales): Observable<any> {
    // let bodyString = JSON.stringify(body);
    this.options = this.persistenceService.getApiHeader();
    return this.http.put(routes.sales(), body, this.options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  deleteSales(id: number): Observable<any> {
    this.options = this.persistenceService.getApiHeader();
    return this.http.delete(routes.sales() + id, this.options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  // end of sales

}

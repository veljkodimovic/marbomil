import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { PersistenceService } from '@app/core/persistence.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const routes = {
    orders: () => `/orders/`
};

@Injectable()
export class ShoppingCartService {

    headers: Headers;
    options: any;
    constructor(private http: Http, private persistenceService: PersistenceService) {
        this.options = this.persistenceService.getApiHeader();

    }

    confirmShopping(requestBody: any): Observable<any> {
        return this.http.post(routes.orders(), requestBody, this.options)
          .map((res: Response) => res)
          .catch((res: Response) => this.persistenceService.handleError(res));
      }

}

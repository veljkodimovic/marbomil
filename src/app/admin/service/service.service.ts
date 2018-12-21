import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Service } from '@app/core/types/service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { PersistenceService } from '../../core/persistence.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { optionsFactory } from 'angular2-notifications';

const routes = {
  service: () => `/service/`
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
export class ServiceService {

  activeService: Service;
  headers: Headers;
  constructor(private http: Http, private persistenceService: PersistenceService) {

  }

  // Service region
  getAllServices(): Observable<any[]> {
    console.log(routes.service());
    return this.http.get(routes.service())
      .map((res: Response) => res.json())
      .map(body =>
        body)
      .catch(err => this.persistenceService.handleError(err));
  }

  getServiceById(id: number): Observable<any> {

    return this.http.get(routes.service() + id, options)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch((err) => this.persistenceService.handleError(err));
  }

  createService(body: Service): Observable<any> {
    // let bodyString = JSON.stringify(body);

    return this.http.post(routes.service(), body, options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  updateService(body: Service): Observable<any> {
    // let bodyString = JSON.stringify(body);

    return this.http.put(routes.service(), body, options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  deleteService(id: number): Observable<any> {

    return this.http.delete(routes.service() + id, options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  // end of service

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { PersistenceService } from '@app/core/persistence.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const routes = {
  service: () => `/service/`,
  banners: () => `/banners/`
};

@Injectable()
export class ServiceService {

  headers: Headers;
  constructor(private http: Http, private persistenceService: PersistenceService) {

  }

  // Service region
  getAllServices(): Observable<any[]> {
    return this.http.get(routes.service())
      .map((res: Response) => res.json())
      .map(body =>
        body)
      .catch(err => this.persistenceService.handleError(err));
  }

  getServiceByCountry(country: string): Observable<any> {
    return this.http.get(routes.service() + '?country=' + country)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch((err) => this.persistenceService.handleError(err));
  }

  getBannerById(id: number): Observable<any> {
    return this.http.get(routes.banners() + id)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch((err) => this.persistenceService.handleError(err));
  }

  // end of service

}

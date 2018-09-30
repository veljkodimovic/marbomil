import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { PersistenceService } from '@app/core/persistence.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const routes = {
  banners: () => `/banner/`
};

@Injectable()
export class QualityService {

  headers: Headers;
  constructor(private http: Http, private persistenceService: PersistenceService) {}

  getBannerById(id: number): Observable<any> {
    return this.http.get(routes.banners() + id)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch((err) => this.persistenceService.handleError(err));
  }

  // end of service

}

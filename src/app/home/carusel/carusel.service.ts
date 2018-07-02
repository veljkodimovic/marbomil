import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Banner } from '@app/core/types/banner';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { PersistenceService } from '../../core/persistence.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const routes = {
  banner: () => `/banner/`
};

@Injectable()
export class CarouselService {
  headers: Headers;
  constructor(private http: Http, private persistenceService: PersistenceService) {
  }

  getAllBanners(): Observable<any[]> {
    return this.http.get(routes.banner())
      .map((res: Response) => res.json())
      .map(body => body)
      .catch(err => this.persistenceService.handleError(err));
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Banner } from '../../core/types/banner';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { PersistenceService } from '../../core/persistence.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const routes = {
  banners: () => `/banners/`
};


@Injectable()
export class BannerService {

  activeBanner: Banner;
  headers: Headers;
  constructor(private http: Http, private persistenceService: PersistenceService) {

  }

  //Banners region
  getAllBanners(): Observable<any[]> {

    return this.http.get(routes.banners())
      .map((res: Response) => res.json())
      .map(body =>
        body)
      .catch(err => this.persistenceService.handleError(err));
  }

  getBannerById(id: number): Observable<any> {

    return this.http.get(routes.banners() + id)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch((err) => this.persistenceService.handleError(err));
  }

  createBanner(body: Banner): Observable<any> {
    //let bodyString = JSON.stringify(body);

    return this.http.post(routes.banners(), body)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  updateBanner(body: Banner): Observable<any> {
    //let bodyString = JSON.stringify(body);

    return this.http.put(routes.banners() + body.id, body)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  deleteBanner(id: number): Observable<any> {

    return this.http.delete(routes.banners() + id)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  //end of banners

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Atest } from '@app/core/types/atest';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { PersistenceService } from '../../core/persistence.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const routes = {
  atest: () => `/atest/`
};

@Injectable()
export class AtestService {

  activeAtest: Atest;
  headers: Headers;
  constructor(private http: Http, private persistenceService: PersistenceService) {

  }

  // Atests region
  getAllAtests(): Observable<any[]> {
    return this.http.get(routes.atest())
      .map((res: Response) => res.json())
      .map(body =>
        body)
      .catch(err => this.persistenceService.handleError(err));
  }

  getAtestById(id: number): Observable<any> {

    return this.http.get(routes.atest() + id)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch((err) => this.persistenceService.handleError(err));
  }

  createAtest(body: Atest): Observable<any> {
    // let bodyString = JSON.stringify(body);

    return this.http.post(routes.atest(), body)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  updateAtest(body: Atest): Observable<any> {
    // let bodyString = JSON.stringify(body);

    return this.http.put(routes.atest() + body.id, body)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  deleteAtest(id: number): Observable<any> {

    return this.http.delete(routes.atest() + id)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  // end of atest

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { PersistenceService } from '@app/core/persistence.service';

const routes = {
  email: () => `/contact/newsletter/registration`
};

@Injectable()
export class FooterService {

  headers: Headers;
  constructor(private http: Http, private persistenceService: PersistenceService) {}

  registerNewsletter(body: any): Observable<any> {
    return this.http.post(routes.email(), body)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }
  // end of service

}

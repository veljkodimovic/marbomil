import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import { PersistenceService } from '@app/core/persistence.service';

const routes = {
  newsletters: () => `/newsletters/subscribers`
};

@Injectable()
export class FooterService {

  headers: Headers;
  constructor(private http: Http, private persistenceService: PersistenceService) {}

  registerNewsletter(email: any): Observable<any> {
    return this.http.post(routes.newsletters(), email)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }
  // end of service

}

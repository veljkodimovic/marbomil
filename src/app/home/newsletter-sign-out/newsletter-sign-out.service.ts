import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { PersistenceService } from '@app/core/persistence.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const routes = {
  newsletter: () => `/newsletter/signout/`
};

@Injectable({
  providedIn: 'root'
})
export class NewsletterSignOutService {
  headers: Headers;

  constructor(private http: Http, private persistenceService: PersistenceService) { }

  signOutFromNewsletter(email: string) {
    return this.http.delete(`${routes.newsletter()}${email}`)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }
}


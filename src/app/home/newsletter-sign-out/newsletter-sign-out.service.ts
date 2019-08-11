import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { PersistenceService } from '@app/core/persistence.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const routes = {
  newsletter: () => `/newsletters/`
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


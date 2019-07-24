import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { PersistenceService } from '@app/core/persistence.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const routes = {
  newsletter: () => `/newsletter/`,
  newsletterSingOut: () => `/newsletter/signout/`
};

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  options: any;

  constructor(private http: Http, private persistenceService: PersistenceService) {
    this.options = this.persistenceService.getApiHeader();
   }

  getAllEmails() {
    this.options = this.persistenceService.getApiHeader();
    return this.http.get(routes.newsletter(), this.options)
    .map((res: any) => res.json())
    .map((body: Promise<string[]>) =>
      body)
    .catch((err: any) => this.persistenceService.handleError(err));
  }

  subscribeToNewsletter(email: string) {
    return this.http.post(routes.newsletter(), {email: email})
    .map((res: any) => res.json())
    .map((body: Promise<string[]>) =>
      body)
    .catch((err: any) => this.persistenceService.handleError(err));
  }

  signOutFromNewsletter(email: string) {
    return this.http.delete(`${routes.newsletterSingOut()}${email}`)
      .map((res: any) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

}

import { Injectable, EventEmitter, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { PersistenceService } from '@app/core/persistence.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const routes = {
  generatecode: () => `/users/forgotpassword/generatecode`
};

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: Http, private persistenceService: PersistenceService) { }

  generateCode(email: string) {
    const body = {
      email: email
    };
    return this.http.post(`${routes.generatecode()}`, body)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

}

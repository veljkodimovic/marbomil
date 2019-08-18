import { Injectable, EventEmitter, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { PersistenceService } from '@app/core/persistence.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const routes = {
  setPassword: () => `/users/forgotpassword`
};

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: Http, private persistenceService: PersistenceService) { }

  setPassword(forgotPasswordCode: string, password: string) {
    const body = {
      registrationCode: forgotPasswordCode,
      password: password
    };
    return this.http.post(`${routes.setPassword()}`, body)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

}

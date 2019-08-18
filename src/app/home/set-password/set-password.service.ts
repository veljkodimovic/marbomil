import { Injectable, EventEmitter, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { PersistenceService } from '@app/core/persistence.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const routes = {
  setPassword: () => `/buyers/activate`
};

@Injectable({
  providedIn: 'root'
})
export class SetPasswordService {

  constructor(private http: Http, private persistenceService: PersistenceService) { }

  setPassword(registrationCode: string, password: string) {
    const body = {
      registrationCode: registrationCode,
      password: password
    };
    return this.http.post(`${routes.setPassword()}`, body)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

}

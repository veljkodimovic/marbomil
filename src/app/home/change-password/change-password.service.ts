import { Injectable, EventEmitter, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { PersistenceService } from '@app/core/persistence.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const routes = {
  changePassword: () => `/users/changepassword`
};

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  options: any;

  constructor(private http: Http, private persistenceService: PersistenceService) { }

  changePassword(oldPass: string, newPass: string) {
    this.options = this.persistenceService.getApiHeader();
    const body = {
      oldPassword: oldPass,
      newPassword: newPass
    };

    return this.http.post(`${routes.changePassword()}`, body, this.options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }
}

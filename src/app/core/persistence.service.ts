import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import  { AuthenticationService } from '../core/authentication/authentication.service';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PersistenceService {
  constructor(private http: Http, private authenticationService: AuthenticationService,   private router: Router) { }

 handleError(err: Response | any): Observable<any> {

  return Observable.of(err);
        // if (err.status === 401)
        // {
        //     return this.unauthorised(err);
        // }
        // else if(this.authenticationService.credentials == null) {
        //   return this.unauthorised(err);
        // }
        // else {
        //     return Observable.of(err);
        // }

  }

 // unauthorised(err: Observable<any>) : Observable<any> {
 //      this.authenticationService.clear();
 //      this.router.navigate(['/login']);
 //      return Observable.of(err);
 // }
 //
 // forbidden(err: Observable<any>) : Observable<any> {
 //   return this.authenticationService.loginRefresh()
 //       .map(credentials => credentials );
 // }

}

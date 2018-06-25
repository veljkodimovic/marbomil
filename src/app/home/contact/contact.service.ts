import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { PersistenceService } from '@app/core/persistence.service';

@Injectable()
export class ContactService {

  headers: Headers;
  constructor(private http: Http, private persistenceService: PersistenceService) {}

  // end of service

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Collection } from '../../core/types/collection';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { PersistenceService } from '../../core/persistence.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const routes = {
  collection: () => `/collection/`,
  category: () => `/category/`
};

const credentialsKey = 'credentials';
const storageLocal = JSON.parse(localStorage.getItem(credentialsKey));
const storageSession = JSON.parse(sessionStorage.getItem(credentialsKey));
let accessToken = '';
if (storageSession) {
  accessToken = storageSession.accessToken;
} else if (storageLocal) {
  accessToken = storageLocal.accessToken;
}
const headers = new Headers({
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + accessToken
});
const options = new RequestOptions({ headers: headers });


@Injectable()
export class CollectionService {

  activeCollection: Collection;
  headers: Headers;
  constructor(private http: Http,
     private persistenceService: PersistenceService) {

  }

  //collection region
  getAllCollections(): Observable<any[]> {

    return this.http.get(routes.collection())
      .map((res: Response) => res.json())
      .map(body =>
        body)
      .catch(err => this.persistenceService.handleError(err));
  }

  getAllCategories(): Observable<any[]> {
    return this.http.get(routes.category())
      .map((res: Response) => res.json())
      .map(body =>
        body)
      .catch(err => this.persistenceService.handleError(err));
  }

  getCollectionById(id: number): Observable<any> {

    return this.http.get(routes.collection() + id)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch((err) => this.persistenceService.handleError(err));
  }

  getCollectionEditById(id: number): Observable<any> {

    return this.http.get(routes.collection() + 'edit/' + id, options)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch((err) => this.persistenceService.handleError(err));
  }

  createCollection(body: Collection): Observable<any> {
    //let bodyString = JSON.stringify(body);

    return this.http.post(routes.collection(), body, options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  updateCollection(body: Collection): Observable<any> {
    //let bodyString = JSON.stringify(body);

    return this.http.put(routes.collection(), body, options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  deleteCollection(id: number): Observable<any> {

    return this.http.delete(routes.collection() + id, options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  //end of collection

}

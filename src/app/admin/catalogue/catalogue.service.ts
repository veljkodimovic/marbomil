import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Catalogue } from '@app/core/types/catalogue';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { PersistenceService } from '../../core/persistence.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const routes = {
  catalogue: () => `/catalogue/`
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
export class CatalogueService {

  activeCatalogue: Catalogue;
  headers: Headers;
  constructor(private http: Http, private persistenceService: PersistenceService) {

  }

  // Catalogues region
  getAllCatalogues(): Observable<any[]> {
    return this.http.get(routes.catalogue())
      .map((res: Response) => res.json())
      .map(body =>
        body)
      .catch(err => this.persistenceService.handleError(err));
  }

  getCatalogueById(id: number): Observable<any> {

    return this.http.get(routes.catalogue() + id, options)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch((err) => this.persistenceService.handleError(err));
  }

  createCatalogue(body: Catalogue): Observable<any> {
    // let bodyString = JSON.stringify(body);

    return this.http.post(routes.catalogue(), body, options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  updateCatalogue(body: Catalogue): Observable<any> {
    // let bodyString = JSON.stringify(body);

    return this.http.put(routes.catalogue(), body, options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  deleteCatalogue(id: number): Observable<any> {

    return this.http.delete(routes.catalogue() + id, options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  uploadCatalogue(file: File) {
    this.http.post('https://file.io', file)
      .subscribe(event => {
        console.log('done');
      });
  }

  // end of catalogue

}

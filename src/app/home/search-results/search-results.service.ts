import { Injectable, EventEmitter, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { PersistenceService } from '@app/core/persistence.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const routes = {
  search: () => `/search/categories/collections/products`
};

@Injectable({
  providedIn: 'root'
})
export class SearchResultsService {
  headers: Headers;
  param: string;
  @Output() searchEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: Http, private persistenceService: PersistenceService) { }

  search(param: string) {
    const body = {
      searchWords: [`${param}`]
    };
    return this.http.post(`${routes.search()}`, body)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }
}

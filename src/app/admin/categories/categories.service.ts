import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { PersistenceService } from '../../core/persistence.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Category } from '@app/core/types/category';

const routes = {
  category: () => `/category/`
};

@Injectable()
export class CategoryService {

  activeCategory: Category;
  headers: Headers;
  constructor(private http: Http, private persistenceService: PersistenceService) {

  }

  // Categories region
  getAllCategories(): Observable<any[]> {

    return this.http.get(routes.category())
      .map((res: Response) => res.json())
      .map(body =>
        body)
      .catch(err => this.persistenceService.handleError(err));
  }

  getCategoryById(id: number): Observable<any> {

    return this.http.get(routes.category() + id)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch((err) => this.persistenceService.handleError(err));
  }

  createCategory(body: Category): Observable<any> {
    // let bodyString = JSON.stringify(body);

    return this.http.post(routes.category(), body)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  updateCategory(body: Category): Observable<any> {
    // let bodyString = JSON.stringify(body);

    return this.http.put(routes.category() + body.id, body)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  deleteCategory(id: number): Observable<any> {

    return this.http.delete(routes.category() + id)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  // end of category

}

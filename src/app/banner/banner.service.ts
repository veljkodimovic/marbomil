import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BannerService {

  private url = 'https://reqres.in/api/users?page=2';
  private urlDetail = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) { }

  getBanners(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  getBannerById(id: string): Observable<any> {
    const url = `${this.urlDetail}/${id}`;
    return this.http.get<any>(url);
  }

}

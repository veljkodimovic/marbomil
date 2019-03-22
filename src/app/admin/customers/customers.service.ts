import { Injectable } from '@angular/core';
import { Customer } from '@app/core/types/customer';
import { PersistenceService } from '@app/core/persistence.service';
import { Observable } from 'rxjs';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const routes = {
  customers: () => `/customers/`
};

@Injectable({
  providedIn: 'root'
})

export class CustomersService {
  activeCustomer: Customer;
  headers: Headers;
  options: any;

  constructor(private http: Http, private persistenceService: PersistenceService) {
    this.options = this.persistenceService.getApiHeader();
  }

  getAllCustomers(): Observable<Customer[]> {
    // return this.http.get(routes.customers())
    //   .map((res: Response) => res.json())
    //   .map((body: Promise<Customer>) =>
    //     body)
    //   .catch((err: any) => this.persistenceService.handleError(err));
    return Observable.of([
      {id: 1, name: 'Customer 1'},
      {id: 2, name: 'Customer 2'},
      {id: 3, name: 'Customer 3'},
      {id: 4, name: 'Customer 4'}
    ]);
  }

  getCustomerById(id: number): Observable<Customer> {
    // return this.http.get(routes.customers() + id, this.options)
    //   .map((res: Response) => res.json())
    //   .map(body => body)
    //   .catch((err) => this.persistenceService.handleError(err));
    return Observable.of(
      {id: id, name: `Customer ${id}`});
  }

  createCustomer(body: Customer): Observable<any> {
    return this.http.post(routes.customers(), body, this.options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  updateCustomer(body: Customer): Observable<any> {
    return this.http.put(routes.customers(), body, this.options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(routes.customers() + id, this.options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }
}



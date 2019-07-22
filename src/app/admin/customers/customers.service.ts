import { Injectable } from '@angular/core';
import { Customer } from '@app/core/types/customer';
import { PersistenceService } from '@app/core/persistence.service';
import { Observable } from 'rxjs';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const routes = {
  customers: () => `/buyers/`
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
    this.options = this.persistenceService.getApiHeader();
    return this.http.get(routes.customers(), this.options)
      .map((res: Response) => res.json())
      .map((body: Promise<Customer>) =>
        body)
      .catch((err: any) => this.persistenceService.handleError(err));
  }

  getCustomerById(id: number): Observable<Customer> {
    this.options = this.persistenceService.getApiHeader();
    return this.http.get(routes.customers() + id, this.options)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch((err) => this.persistenceService.handleError(err));
  }

  createCustomer(body: Customer): Observable<any> {
    this.options = this.persistenceService.getApiHeader();
    return this.http.post(routes.customers(), body, this.options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  updateCustomer(body: Customer): Observable<any> {
    this.options = this.persistenceService.getApiHeader();
    return this.http.put(routes.customers(), body, this.options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  deleteCustomer(id: number): Observable<any> {
    this.options = this.persistenceService.getApiHeader();
    return this.http.delete(routes.customers() + id, this.options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }
}



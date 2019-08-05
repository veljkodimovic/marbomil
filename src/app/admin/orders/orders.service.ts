import { Injectable } from '@angular/core';
import { Order } from '@app/core/types/order';
import { PersistenceService } from '@app/core/persistence.service';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const routes = {
  orders: () => `/orders/`,
  getOrdersForLoggedUser: () => `/orders/loggedbuyer`,
};

@Injectable({
  providedIn: 'root'
})

export class OrdersService {

  activeOrder: Order;
  headers: Headers;
  options: any;

  constructor(private http: Http, private persistenceService: PersistenceService) {
    this.options = this.persistenceService.getApiHeader();
  }

  getAllOrders(): Observable<Order[]> {
    this.options = this.persistenceService.getApiHeader();
    return this.http.get(routes.orders(), this.options)
      .map((res: Response) => res.json())
      .map((body: Promise<Order>) =>
        body)
      .catch((err: any) => this.persistenceService.handleError(err));
  }

  getOrdersForLoggedUser() {
    this.options = this.persistenceService.getApiHeader();
    return this.http.get(routes.getOrdersForLoggedUser(), this.options)
      .map((res: Response) => res.json())
      .map((body: Promise<Order>) =>
        body)
      .catch((err: any) => this.persistenceService.handleError(err));
  }

  getOrderById(id: number): Observable<Order> {
    this.options = this.persistenceService.getApiHeader();
    return this.http.get(`${routes.orders()}${id}`, this.options)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch((err) => this.persistenceService.handleError(err));
  }

  createOrder(body: Order): Observable<any> {
    this.options = this.persistenceService.getApiHeader();
    return this.http.post(routes.orders(), body, this.options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  updateOrder(body: Order): Observable<any> {
    this.options = this.persistenceService.getApiHeader();
    return this.http.put(routes.orders(), body, this.options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  deleteOrder(id: number): Observable<any> {
    this.options = this.persistenceService.getApiHeader();
    return this.http.delete(routes.orders() + id, this.options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }
}

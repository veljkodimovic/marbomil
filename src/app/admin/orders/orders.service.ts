import { Injectable } from '@angular/core';
import { Order } from '@app/core/types/order';
import { PersistenceService } from '@app/core/persistence.service';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const routes = {
  orders: () => `/orders/`
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
    // return this.http.get(routes.orders())
    //   .map((res: Response) => res.json())
    //   .map((body: Promise<Order>) =>
    //     body)
    //   .catch((err: any) => this.persistenceService.handleError(err));
    return Observable.of([
      {id: 1, name: 'Order 1', items: []},
      {id: 2, name: 'Order 2', items: []},
      {id: 3, name: 'Order 3', items: []},
      {id: 4, name: 'Order 4', items: []}
    ]);
  }

  getOrderById(id: number): Observable<Order> {
    // return this.http.get(routes.orders() + id, this.options)
    //   .map((res: Response) => res.json())
    //   .map(body => body)
    //   .catch((err) => this.persistenceService.handleError(err));
    return Observable.of(
      {id: id, name: `Order ${id}`, items: []});
  }

  createOrder(body: Order): Observable<any> {
    return this.http.post(routes.orders(), body, this.options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  updateOrder(body: Order): Observable<any> {
    return this.http.put(routes.orders(), body, this.options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete(routes.orders() + id, this.options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }
}

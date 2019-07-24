import { Component, OnInit, ViewChild } from '@angular/core';
import { DeleteModalComponent } from '@app/shared/delete-modal/delete-modal';
import { Order } from '@app/core/types/order';
import { Router } from '@angular/router';
import { OrdersService } from '../orders.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  @ViewChild(DeleteModalComponent)
  private modal: DeleteModalComponent;
  ordersData: Order[];
  activeOrder: Order;

  constructor(private orderService: OrdersService,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders() {
    this.orderService.getAllOrders().subscribe(data => {
      this.ordersData = data;
    });
  }

  calculatePrice(order: Order) {
    let price = 0;
    order.items.forEach(item => {
      // price += item.priceWithDiscount * item.quantity;
      price += item.price * item.quantity;
    });
    return price;
  }

  goTo(order: Order) {
    this.router.navigate(['/admin/order/' + order.id]);
  }

  openModal(order: Order) {
    this.activeOrder = order;
    this.modal.openModal();
  }

  performDelete(event: any) {
    this.orderService.deleteOrder(this.activeOrder.id).subscribe(res => {
      this.getAllOrders();
    });
  }
}

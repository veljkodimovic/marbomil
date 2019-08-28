import { Component, OnInit, ViewChild } from '@angular/core';
import { DeleteModalComponent } from '@app/shared/delete-modal/delete-modal';
import { Order } from '@app/core/types/order';
import { Router } from '@angular/router';
import { OrdersService } from '../orders.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomersService } from '@app/admin/customers/customers.service';
import { Customer } from '@app/core/types/customer';

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
  isLoading: boolean;
  priceFrom: number;
  priceTo: number;

  selectedStatuses = ['ReadyForProcessing', 'Accepted', 'Completed'];
  statuses = [
    { id: 'ReadyForProcessing', name: 'Ready For Processing' },
    { id: 'Accepted', name: 'Accepted' },
    { id: 'Rejected', name: 'Rejected' },
    { id: 'Completed', name: 'Completed' }
  ];
  allOrders: Order[];
  customers: Customer[];
  selectedCustomers: any;

  constructor(private orderService: OrdersService,
    private customersService: CustomersService,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.isLoading = true;
    this.getAllOrders();
  }

  getAllOrders() {
    this.customersService.getAllCustomers().subscribe((customers: Customer[]) => {
      this.customers = customers;
      this.orderService.getAllOrders().subscribe(data => {
        this.allOrders = data;
        this.filterOrders(this.allOrders);
        this.isLoading = false;
      });
    });
  }

  filterOrders(data: Order[]) {
    // this.priceFrom = this.priceFrom ? this.priceFrom : 0;
    // this.priceTo = this.priceTo ? this.priceTo : 0;
    this.ordersData = [...this.allOrders];
    if (this.selectedStatuses && this.selectedStatuses.length) {
      this.ordersData = [...data.filter(o => this.selectedStatuses.includes(o.status))];
    }
    if (this.priceFrom) {
      this.ordersData = [...this.ordersData.filter(o => this.calculatePrice(o) >= this.priceFrom)];
    }
    if (this.priceTo) {
      this.ordersData = [...this.ordersData.filter(o => this.calculatePrice(o) <= this.priceTo)];
    }
    if (this.selectedCustomers && this.selectedCustomers.length) {
      this.ordersData = [...this.ordersData.filter(o => this.selectedCustomers.includes(o.buyerId))];
    }

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

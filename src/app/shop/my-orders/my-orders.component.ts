import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@app/admin/orders/orders.service';
import { Order } from '@app/core/types/order';
import { DeleteModalComponent } from '@app/shared/delete-modal/delete-modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../product/product.service';
import { Product } from '@app/core/types/product';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  private modal: DeleteModalComponent;
  ordersData: Order[];
  activeOrder: Order;
  isLoading: boolean;
  products: Product[] = [];

  constructor(private orderService: OrdersService, private productsService: ProductService, private modalService: NgbModal) { }

  ngOnInit() {
    this.isLoading = true;
    this.productsService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.getOrdersForLoggedUser();
    });
  }

  getOrdersForLoggedUser() {
    this.orderService.getOrdersForLoggedUser().subscribe((orders: Order[]) => {
      this.ordersData = orders;
      this.isLoading = false;
    });
  }

  openDetails(order: Order, content: any) {
    this.activeOrder = order;
    console.log(this.activeOrder);
    this.modalService.open(content, { size: 'lg' });
  }

  calculatePrice(order: Order) {
    let price = 0;
    order.items.forEach(item => {
      // price += item.priceWithDiscount * item.quantity;
      price += item.price * item.quantity;
    });
    return price;
  }

  getItemById(productId: number) {
    return this.products.find(p => p.id === productId);
  }

}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DeleteModalComponent } from '@app/shared/delete-modal/delete-modal';
import { Order } from '@app/core/types/order';
import { OrdersService } from '../orders.service';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CustomersService } from '@app/admin/customers/customers.service';
import { Customer } from '@app/core/types/customer';
import { ProductService } from '@app/admin/product/product.service';
import { Product } from '@app/core/types/product';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements OnInit {

  @ViewChild(DeleteModalComponent)
  private modal: DeleteModalComponent;
  data: any;
  order: Order = new Order([], '', null, new Date());
  serviceUrl: any;
  link: any;
  isLoading: boolean;
  isEditMode = true;
  disableSave = false;
  blockAll = false;

  success: any = this.translate.get('Success');
  savingError: any = this.translate.get('Saving error');
  successfullSavedOrder: any = this.translate.get('Successfull saved order');
  customers: Customer[];
  statuses = [
    { id: 'ReadyForProcessing', name: 'Ready For Processing' },
    { id: 'Accepted', name: 'Accepted' },
    { id: 'Rejected', name: 'Rejected' },
    { id: 'Completed', name: 'Completed' }
  ];
  products: Product[];
  orderProducts: any[] = [];
  newOrder: any = { productId: null, quantity: null };

  constructor(private ordersService: OrdersService,
    private translate: TranslateService,
    private notificationService: NotificationsService,
    private customersService: CustomersService,
    private productsService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {
    this.data = {};
  }

  ngOnInit() {
    this.isLoading = true;
    this.customersService.getAllCustomers().subscribe((customers: Customer[]) => {
      this.customers = customers;
      this.productsService.getProducts().subscribe((products: Product[]) => {
        this.products = products;
        this.products.forEach((p: Product) => {
          p.bindLabel = `${p.orderNumber} - ${p.title}`;
          if (this.router.url.indexOf('new') !== -1) {
            this.isEditMode = false;
            this.isLoading = false;
          } else {
            this.isEditMode = true;
            this.getOrderDetails();
          }
        });
      });
    });
  }

  getOrderDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.ordersService.getOrderById(Number(id)).subscribe((data: Order) => {
      this.order = data;
      // this.order.items.forEach(product => {
      //   this.orderProducts.push({productId: product.id, quantity: product.quantity});
      // });
      this.isLoading = false;
    });
  }

  addProduct(form: NgForm, element: HTMLElement) {
    const newOrder = { ...this.newOrder };
    if (this.orderProducts.find(op => op.productId === newOrder.productId)) {
      const q = this.orderProducts.find(op => op.productId === newOrder.productId).quantity + newOrder.quantity;
      this.orderProducts.find(op => op.productId === newOrder.productId).quantity = q;
      form.reset();
      element.focus();
    } else {
      this.orderProducts.push(newOrder);
      form.reset();
      element.focus();
    }
  }

  saveOnClick() {
    this.isLoading = true;
    this.disableSave = true;
    this.blockAll = true;

    if (this.isEditMode) {

      this.ordersService.updateOrder(this.order)
        .finally(() => { this.isLoading = false; })
        .subscribe((response: any) => {
          this.blockAll = false;
          this.handleResponse(response);
        });
    } else {
      this.order.items = this.orderProducts;
      this.ordersService.createOrderByAdmin(this.order)
        .finally(() => { this.isLoading = false; })
        .subscribe((response: any) => {
          this.blockAll = false;
          this.handleResponse(response);
          const id = +response._body;
          this.order.id = id;
        });
    }
  }

  getItemById(productId: number) {
    return this.products.find(p => p.id === productId);
  }

  calculatePrice() {
    if (this.orderProducts) {
      let price = 0;
      this.orderProducts.forEach((op) => {
        price += op.quantity * this.getItemById(op.productId).price;
      });
      return price;
    }
  }

  handleResponse(response: any) {
    this.disableSave = false;
    if (!response.ok) {
      const body = JSON.parse(response._body);
      if (body.title) {
        this.notificationService.error(body.title, body.description,
          {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: false,
            maxLength: 100
          });
      } else {
        let description = '';
        for (const errorDescription of body) {
          description += errorDescription + '<br>';
        }
        this.notificationService.warn(this.savingError.value, description,
          {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: false,
            maxLength: 100
          });
      }
    } else {
      this.notificationService.success(this.success.value, this.successfullSavedOrder.value,
        {
          timeOut: 1000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: false,
          maxLength: 100
        });
      setTimeout(() => {
        this.router.navigate(['/admin/orders']);
      }, 1000);
      this.isEditMode = true;
    }
  }

  scrollTop(f: NgForm) {
    if (!f.form.valid) {
      const scrollToTop = window.setInterval(() => {
        const pos = window.pageYOffset;
        if (pos > 0) {
          window.scrollTo(0, pos - 20); // how far to scroll on each step
        } else {
          window.clearInterval(scrollToTop);
        }
      }, 16);
    }
  }

  openModal() {
    this.modal.openModal();
  }

  performDelete(event: any) {
    this.ordersService.deleteOrder(this.order.id).subscribe(res => {
      this.router.navigate(['/admin/orders/']);
    });
  }


}

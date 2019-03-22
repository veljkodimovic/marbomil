import { Component, OnInit, ViewChild } from '@angular/core';
import { DeleteModalComponent } from '@app/shared/delete-modal/delete-modal';
import { Order } from '@app/core/types/order';
import { OrdersService } from '../orders.service';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements OnInit {

  @ViewChild(DeleteModalComponent)
  private modal: DeleteModalComponent;
  // image: any;
  data: any;
  order: Order = new Order(0, '', []);
  serviceUrl: any;
  link: any;
  isLoading: boolean;
  isEditMode = true;
  disableSave = false;
  blockAll = false;
  // @ViewChild('gmap')
  // gmapElement: ElementRef;
  // map: google.maps.Map;

  success: any = this.translate.get('Success');
  savingError: any = this.translate.get('Saving error');
  successfullSavedOrder: any = this.translate.get('Successfull saved order');

  constructor(private ordersService: OrdersService,
    private translate: TranslateService,
    private notificationService: NotificationsService,
    private router: Router,
    private route: ActivatedRoute) {
    this.data = {};
  }

  ngOnInit() {
    if (this.router.url.indexOf('new') !== -1) {
      this.isEditMode = false;
    } else {
      this.isEditMode = true;
      this.getOrderDetails();
    }
  }

  getOrderDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.ordersService.getOrderById(Number(id)).subscribe((data: Order) => {
      this.order = data;
      // if (this.service.latitude.length && this.service.longitude.length) {
      //   const uluru = {lat: parseFloat(this.service.latitude), lng: parseFloat(this.service.longitude)};
      //   const mapProp = {
      //     center: uluru,
      //     zoom: 15,
      //     mapTypeId: google.maps.MapTypeId.ROADMAP
      //   };
      //   this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
      //   const marker = new google.maps.Marker({
      //     position: uluru,
      //     map: this.map
      //   });
      // }
    });
  }

  saveOnClick() {
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
      this.ordersService.createOrder(this.order)
        .finally(() => { this.isLoading = false; })
        .subscribe((response: any) => {
          this.blockAll = false;
          this.handleResponse(response);
          const id = +response._body;
          this.order.id = id;
        });
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

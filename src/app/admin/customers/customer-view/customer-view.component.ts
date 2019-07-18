/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomersService } from '@app/admin/customers/customers.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Customer } from '@app/core/types/customer';
import { NotificationsService } from 'angular2-notifications';
import { DeleteModalComponent } from '@app/shared/delete-modal/delete-modal';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.scss']
})
export class CustomerViewComponent implements OnInit {

  @ViewChild(DeleteModalComponent)
  private modal: DeleteModalComponent;
  data: any;
  customer: Customer = new Customer('', '', '', '', '', '', '', null, '', true, '', '', '');
  serviceUrl: any;
  link: any;
  isLoading: boolean;
  isEditMode = true;
  disableSave = false;
  blockAll = false;

  success: any = this.translate.get('Success');
  savingError: any = this.translate.get('Saving error');
  successfullSavedCustomer: any = this.translate.get('Successfull saved customer');

  constructor(private customersService: CustomersService,
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
      this.getCustomerDetails();
    }
  }

  getCustomerDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.customersService.getCustomerById(Number(id)).subscribe((data: Customer) => {
      this.customer = data;
    });
  }

  saveOnClick() {
    this.disableSave = true;
    this.blockAll = true;

    if (this.isEditMode) {

      this.customersService.updateCustomer(this.customer)
        .finally(() => { this.isLoading = false; })
        .subscribe((response: any) => {
          this.blockAll = false;
          this.handleResponse(response);
        });
    } else {
      this.customersService.createCustomer(this.customer)
        .finally(() => { this.isLoading = false; })
        .subscribe((response: any) => {
          this.blockAll = false;
          this.handleResponse(response);
          const id = +response._body;
          this.customer.id = id;
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
      this.notificationService.success(this.success.value, this.successfullSavedCustomer.value,
        {
          timeOut: 1000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: false,
          maxLength: 100
        });
      setTimeout(() => {
        this.router.navigate(['/admin/customers']);
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
    this.customersService.deleteCustomer(this.customer.id).subscribe(res => {
      this.router.navigate(['/admin/customers/']);
    });
  }

}

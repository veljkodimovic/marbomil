import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '@app/core/types/customer';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from '@app/shared/delete-modal/delete-modal';
import { CustomersService } from '../customers.service';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  @ViewChild(DeleteModalComponent)
  private modal: DeleteModalComponent;
  customersData: Customer[];
  activeCustomer: Customer;
  isLoading: boolean;

  constructor(private customerService: CustomersService,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.isLoading = true;
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.customerService.getAllCustomers().subscribe(data => {
          this.customersData = data;
          this.isLoading = false;
    });
  }

  goTo(customer: Customer) {
    this.router.navigate(['/admin/customer/' + customer.id]);
  }

  openModal(customer: Customer) {
    this.activeCustomer = customer;
    this.modal.openModal();
  }

  performDelete(event: any) {
    this.customerService.deleteCustomer(this.activeCustomer.id).subscribe(res => {
      this.getAllCustomers();
    });
  }

}



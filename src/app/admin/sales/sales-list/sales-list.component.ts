import {Component, OnInit, ViewChild} from '@angular/core';
import { SalesService } from '../sales.service';
import { Router } from '@angular/router';
import { Sales } from '@app/core/types/sales';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from '@app/shared/delete-modal/delete-modal';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent implements OnInit {
  @ViewChild(DeleteModalComponent)
  private modal: DeleteModalComponent;
  salesData: Sales[];

  activeSales: Sales;
  isLoading: boolean;

  constructor(private svc: SalesService,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.isLoading = true;
    this.svc.getAllSales().subscribe(data => {
      this.salesData = data;
      this.isLoading = false;
    });
  }

  goTo(sales: Sales) {
    this.router.navigate(['/admin/sales/' + sales.id]);
  }

  openModal(sales: Sales) {
    this.activeSales = sales;
    this.modal.openModal();
  }

  performDelete(event: any) {
    this.svc.deleteSales(this.activeSales.id).subscribe(res => {
      this.svc.getAllSales().subscribe(data => {
        this.salesData = data;
      });
    });
  }

}

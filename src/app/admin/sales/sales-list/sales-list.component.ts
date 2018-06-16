import { Component, OnInit } from '@angular/core';
import { SalesService } from '../sales.service';
import { Router } from '@angular/router';
import { Sales } from '@app/core/types/sales';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent implements OnInit {

  salesData: Sales[];

  constructor(private svc: SalesService,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.svc.getAllSales().subscribe(data => {
      console.log(data);
      this.salesData = data;
    });
  }

  goTo(sales: Sales) {
    this.router.navigate(['/admin/sales/' + sales.id]);
  }

  deleteAction(sales: Sales) {
    this.svc.deleteSales(sales.id).subscribe(res => {
      console.log('Deleted');
      this.router.navigate(['/admin/sales/']);
    });
  }

  openModal(content: any) {
    this.modalService.open(content);
  }

}

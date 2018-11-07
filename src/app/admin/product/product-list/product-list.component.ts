import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Product } from '../../../core/types/product';
import { PersistenceService } from '@app/core/persistence.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from '../../../shared/delete-modal/delete-modal';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @ViewChild(DeleteModalComponent)
  private modal: DeleteModalComponent;
  private apiUrl: string;
  productData: any;
  activePruduct: Product;
  constructor(private svc: ProductService,
    private persistenceService: PersistenceService,
    private router: Router
  ) {
    this.apiUrl = persistenceService.apiUrl;
  }

  ngOnInit() {
    this.svc.getProducts().subscribe(data => {
      this.productData = data;
    });
  }

  openModal(product: Product) {
    this.activePruduct = product;
    this.modal.openModal();
  }

  performDelete(event: any) {
    this.svc.deleteProduct(this.activePruduct.id).subscribe(res => {
      this.svc.getProducts().subscribe(data => {
        this.productData = data;
      });
    });
  }

}

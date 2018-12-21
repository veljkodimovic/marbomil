import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Product } from '../../../core/types/product';
import { Category } from '../../../core/types/category';
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
  products: any;
  activeProduct: Product;
  categories: Category[] = [];
  activeCategory: Category;
  activeCategoryId: number;
  constructor(private svc: ProductService,
    private persistenceService: PersistenceService,
    private router: Router
  ) {
    this.apiUrl = persistenceService.apiUrl;
  }

  ngOnInit() {
    this.svc.getProducts().subscribe(data => {
      this.productData = data;
      this.productData.sort(function(a: any, b: any) {
        return a.orderNumber - b.orderNumber;
      });
      this.products = this.productData;
    });
    this.svc.getAllCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }

  openModal(product: Product) {
    this.activeProduct = product;
    this.modal.openModal();
  }

  performDelete(event: any) {
    this.svc.deleteProduct(this.activeProduct.id).subscribe(res => {
      this.svc.getProducts().subscribe(data => {
        this.productData = data;
      });
    });
  }

  updateProducts() {
    const categoryId = this.activeCategoryId;
    console.log(categoryId);
    this.products = this.productData;
    if (categoryId > 0) {
      this.products = this.products.filter((x: any) => x.categoryId === categoryId);
    }
  }

}

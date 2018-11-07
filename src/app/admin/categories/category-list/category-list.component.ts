import {Component, OnInit, Input, ViewChild} from '@angular/core';
import { CategoryService } from '@app/admin/categories/categories.service';
import { Category } from '@app/core/types/category';
import { PersistenceService } from '@app/core/persistence.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DeleteModalComponent } from '@app/shared/delete-modal/delete-modal';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})

export class CategoryListComponent implements OnInit {
  @ViewChild(DeleteModalComponent)
  private modal: DeleteModalComponent;
  private apiUrl: string;
  categoryData: Category[];
  categoryAllData: any = [];

  activeCategory: Category;

  constructor(private svc: CategoryService,
    private persistenceService: PersistenceService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.apiUrl = persistenceService.apiUrl;
  }

  ngOnInit() {
    this.svc.getAllCategories().subscribe(data => {
      console.log(data);
      this.categoryData = data;
      this.categoryAllData = data;
    });
  }

  goTo(category: Category) {
    this.router.navigate(['/admin/category/' + category.id]);
  }

  getCategoryName(id: number) {
    if (this.categoryAllData.length > 0 && id > 0) {
      return this.categoryAllData.find((x: any) => x.id = id).title;
    }
  }

  openModal(category: Category) {
    this.activeCategory = category;
    this.modal.openModal();
  }

  performDelete(event: any) {
    this.svc.deleteCategory(this.activeCategory.id).subscribe(res => {
      this.svc.getAllCategories().subscribe(data=> {
        this.categoryData = data;
      });
    });
  }

}

import {Component, OnInit, Input, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '@app/core/types/category';
import { CategoryService } from '@app/admin/categories/categories.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from '@app/shared/delete-modal/delete-modal';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})

export class CategoryListComponent implements OnInit {
  @ViewChild(DeleteModalComponent)
  private modal: DeleteModalComponent;
  categoryData: Category[];

  activeCategory: Category;

  constructor(private svc: CategoryService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.svc.getAllCategories().subscribe(data => {
      console.log(data);
      this.categoryData = data;
    });
  }

  goTo(category: Category) {
    this.router.navigate(['/admin/category/' + category.id]);
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

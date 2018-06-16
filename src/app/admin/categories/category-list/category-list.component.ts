import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '@app/core/types/category';
import { CategoryService } from '@app/admin/categories/categories.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export class NgbdModalContent {
  @Input() category: Category;

  constructor(private svc: CategoryService,
    public activeModal: NgbActiveModal) { }
}

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})

export class CategoryListComponent implements OnInit {

  categoryData: Category[];

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

  deleteAction(category: Category) {
    this.svc.deleteCategory(category.id).subscribe(res => {
      console.log('Deleted');
      this.router.navigate(['/admin/category/']);
    });
  }

  openModal(content: any) {
    this.modalService.open(content);
  }

}

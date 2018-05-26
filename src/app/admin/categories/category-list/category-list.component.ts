import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../categories.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})

export class CategoryListComponent implements OnInit {

  categoryData: any;

  constructor(private svc: CategoryService) {}

  ngOnInit() {
    this.svc.getCategories().subscribe(data => {
      this.categoryData = data;
    });
  }

}

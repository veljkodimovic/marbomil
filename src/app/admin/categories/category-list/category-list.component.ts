import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../../core/types/category';
import {CategoryService} from '@app/admin/categories/categories.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})

export class CategoryListComponent implements OnInit {

  categoryData: Category[];

  constructor(private svc: CategoryService,
              private router: Router,
  ) { }

  ngOnInit() {
    this.svc.getAllCategories().subscribe(data => {
      console.log(data);
      this.categoryData = data;
    });
  }

}

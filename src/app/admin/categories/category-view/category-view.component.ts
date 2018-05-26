import { Component, OnInit } from '@angular/core';
import { CategoryService} from '../categories.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.scss']
})
export class CategoryViewComponent implements OnInit {

   category: any;
   link: any;
  constructor(private svc: CategoryService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getCategoryDetails();
  }

  getCategoryDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.svc.getCategoryById(id).subscribe(data => {
      this.category = data.data;
    });
  }

}

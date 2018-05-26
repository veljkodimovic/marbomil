import { Component, OnInit } from '@angular/core';
import { CollectionService} from '../collections.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-collection-view',
  templateUrl: './collection-view.component.html',
  styleUrls: ['./collection-view.component.scss']
})
export class CollectionViewComponent implements OnInit {

   collection: any;
   link: any;
  constructor(private svc: CollectionService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getCollectionDetails();
  }

  getCollectionDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.svc.getCollectionById(id).subscribe(data => {
      this.collection = data.data;
    });
  }

}

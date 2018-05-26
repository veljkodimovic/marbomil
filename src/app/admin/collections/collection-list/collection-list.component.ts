import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../collections.service';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})

export class CollectionListComponent implements OnInit {

  collectionData: any;

  constructor(private svc: CollectionService) {}

  ngOnInit() {
    this.svc.getCollections().subscribe(data => {
      this.collectionData = data;
    });
  }

}

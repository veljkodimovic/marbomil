import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../collections.service';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})

export class CollectionListComponent implements OnInit {

  collectionData: any = [];
  categoryData: any = [];

  constructor(private svc: CollectionService,
              private router: Router,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.svc.getAllCollections().subscribe(data => {
      this.collectionData = data;
    });

    this.svc.getAllCategories().subscribe(data => {
      this.categoryData = data;
    });
  }

  getCollectionName(id: number) {
    if (this.collectionData.length > 0 && id > 0) {
      return this.collectionData.find((x: any) => x.id = id).title;
    }
  }

  getCategoryName(id: number) {
    if (this.categoryData.length > 0 && id > 0) {
      return this.categoryData.find((x: any) => x.id = id).title;
    }
  }

  deleteAction(collection: Collection) {
    this.svc.deleteCollection(collection.id).subscribe(res => {
      console.log('Deleted');
      this.router.navigate(['/admin/collection/']);
    });
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

}

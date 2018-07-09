import {Component, OnInit, ViewChild} from '@angular/core';
import { CollectionService } from '../collections.service';
import { Collection } from '@app/core/types/collection';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DeleteModalComponent } from '@app/shared/delete-modal/delete-modal';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})

export class CollectionListComponent implements OnInit {
  @ViewChild(DeleteModalComponent)
  private modal: DeleteModalComponent;
  collectionData: any = [];
  categoryData: any = [];

  activeCollection: Collection;

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

  goTo(collection: Collection) {
    this.router.navigate(['/admin/collection/' + collection.id]);
  }

  getCollectionName(id: number) {
    if (this.collectionData.length > 0 && id > 0) {
      return this.collectionData.find((x: any) => x.id === id).title;
    }
  }

  getCategoryName(id: number) {
    if (this.categoryData.length > 0 && id > 0) {
      return this.categoryData.find((x: any) => x.id === id).title;
    }
  }

  openModal(atest: Collection) {
    this.activeCollection = atest;
    this.modal.openModal();
  }

  performDelete(event: any) {
    this.svc.deleteCollection(this.activeCollection.id).subscribe(res => {
      this.svc.getAllCollections().subscribe(data => {
        this.collectionData = data;
      });
    });
  }

}

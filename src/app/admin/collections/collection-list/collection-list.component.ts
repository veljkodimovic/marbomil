import { Component, OnInit, ViewChild } from '@angular/core';
import { CollectionService } from '../collections.service';
import { Collection } from '@app/core/types/collection';
import { PersistenceService } from '@app/core/persistence.service';
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
  private apiUrl: string;
  collectionData: any = [];
  categoryData: any = [];
  isLoading: boolean;
  activeCollection: Collection;

  constructor(private svc: CollectionService,
    private persistenceService: PersistenceService,
    private router: Router,
    private modalService: NgbModal) {
    this.apiUrl = persistenceService.apiUrl;
  }

  ngOnInit() {
    this.isLoading = true;
    this.svc.getAllCollections().subscribe(dataCa => {
      this.collectionData = dataCa;
      this.svc.getAllCategories().subscribe(dataCo => {
        this.categoryData = dataCo;
        this.isLoading = false;
      });
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

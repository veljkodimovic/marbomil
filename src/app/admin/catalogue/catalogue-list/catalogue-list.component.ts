import {Component, OnInit, ViewChild} from '@angular/core';
import { CatalogueService } from '../catalogue.service';
import { Router } from '@angular/router';
import { Catalogue } from '../../../core/types/catalogue';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from '@app/shared/delete-modal/delete-modal';

@Component({
  selector: 'app-catalogue-list',
  templateUrl: './catalogue-list.component.html',
  styleUrls: ['./catalogue-list.component.scss']
})
export class CatalogueListComponent implements OnInit {
  @ViewChild(DeleteModalComponent)
  private modal: DeleteModalComponent;
  catalogueData: Catalogue[];

  activeCatalogue: Catalogue;

  constructor(private svc: CatalogueService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.svc.getAllCatalogues().subscribe(data => {
      this.catalogueData = data;
    });
  }

  goTo(catalogue: Catalogue) {
    this.router.navigate(['/admin/catalogue/' + catalogue.id]);
  }

  openModal(catalogue: Catalogue) {
    this.activeCatalogue = catalogue;
    this.modal.openModal();
  }

  performDelete(event: any) {
    this.svc.deleteCatalogue(this.activeCatalogue.id).subscribe(res => {
      this.svc.getAllCatalogues().subscribe(data=> {
        this.catalogueData = data;
      });
    });
  }

}

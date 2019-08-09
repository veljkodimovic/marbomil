import { Component, OnInit, ViewChild } from '@angular/core';
import { CatalogueService } from '../catalogue.service';
import { Router } from '@angular/router';
import { Catalogue } from '../../../core/types/catalogue';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from '@app/shared/delete-modal/delete-modal';
import { environment } from '@env/environment.prod';

@Component({
  selector: 'app-catalogue-list',
  templateUrl: './catalogue-list.component.html',
  styleUrls: ['./catalogue-list.component.scss']
})
export class CatalogueListComponent implements OnInit {
  @ViewChild(DeleteModalComponent)
  private modal: DeleteModalComponent;
  catalogueData: Catalogue[];
  apiUrl: string;
  activeCatalogue: Catalogue;
  isLoading: boolean;

  constructor(private svc: CatalogueService,
    private router: Router
  ) {
    this.apiUrl = environment.serverUrl;
  }

  ngOnInit() {
    this.isLoading = true;
    this.svc.getAllCatalogues().subscribe(data => {
      this.catalogueData = data;
      this.isLoading = false;
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
      this.svc.getAllCatalogues().subscribe(data => {
        this.catalogueData = data;
      });
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';
import { Router } from '@angular/router';
import { Catalogue } from '../../../core/types/catalogue';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-catalogue-list',
  templateUrl: './catalogue-list.component.html',
  styleUrls: ['./catalogue-list.component.scss']
})
export class CatalogueListComponent implements OnInit {

  catalogueData: Catalogue[];

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

  deleteAction(catalogue: Catalogue) {
    this.svc.deleteCatalogue(catalogue.id).subscribe(res => {
      console.log('Deleted');
    });
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

}

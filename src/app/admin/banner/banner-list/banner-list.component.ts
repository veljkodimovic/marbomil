import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BannerService } from '../banner.service';
import { Router } from '@angular/router';
import { Banner } from '../../../core/types/banner';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from '../../../shared/delete-modal/delete-modal';

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss']
})
export class BannerListComponent implements OnInit {
  @ViewChild(DeleteModalComponent)
  private modal: DeleteModalComponent;
  bannerData: Banner[];

  activeBanner: Banner;

  constructor(private svc: BannerService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.svc.getAllBanners().subscribe(data => {
      console.log(data);
      this.bannerData = data;
    });
  }

  goTo(banner: Banner) {
    this.router.navigate(['/admin/banner/' + banner.id]);
  }


  openModal(banner: Banner) {
    this.activeBanner = banner;
    this.modal.openModal();
  }

  performDelete(event: any) {
    this.svc.deleteBanner(this.activeBanner.id).subscribe(res => {
      this.router.navigate(['/admin/banner/']);
    });
  }

}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BannerService } from '../banner.service';
import { Router } from '@angular/router';
import { Banner } from '@app/core/types/banner';
import { PersistenceService } from '@app/core/persistence.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from '@app/shared/delete-modal/delete-modal';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss']
})
export class BannerListComponent implements OnInit {
  @ViewChild(DeleteModalComponent)
  private modal: DeleteModalComponent;
  private apiUrl: string;
  bannerData: Banner[];

  activeBanner: Banner;

  constructor(private svc: BannerService,
    private persistenceService: PersistenceService,
    private router: Router,
    private notificationService: NotificationsService,
    private modalService: NgbModal
  ) {
    this.apiUrl = persistenceService.apiUrl;
  }

  ngOnInit() {
    this.svc.getAllBanners().subscribe(data => {
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
      this.svc.getAllBanners().subscribe(data => {
        this.bannerData = data;
        this.notificationService.success('Banner deleted ', 'Banner has been deleted successfully.',
            {
              timeOut: 2000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: false,
              maxLength: 100
            });
      });
    });
  }

}

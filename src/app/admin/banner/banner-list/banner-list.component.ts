import { Component, OnInit } from '@angular/core';
import { BannerService } from '../banner.service';
import { Router } from '@angular/router';
import { Banner } from '../../../core/types/banner';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss']
})
export class BannerListComponent implements OnInit {

  bannerData: Banner[];

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

  deleteAction(banner: Banner) {
    this.svc.deleteBanner(banner.id).subscribe(res => {
      console.log('Deleted');
    });
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

}

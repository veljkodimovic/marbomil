import { NgModule, Component, Input, Output, EventEmitter, Renderer, ElementRef, forwardRef, OnInit, ViewChild } from '@angular/core';
import { SalesService } from '@app/admin/sales/sales.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Sales } from '@app/core/types/sales';
import { NotificationsService } from 'angular2-notifications';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-sales-view',
  templateUrl: './sales-view.component.html',
  styleUrls: ['./sales-view.component.scss']
})
export class SalesViewComponent implements OnInit {
  image: any;
  data: any;
  sales: Sales = new Sales(0, '', '', '', '', '', '', '', '', '', '', '');
  salesUrl: any;
  link: any;
  isLoading: boolean;
  isEditMode: boolean = true;
  disableSave: boolean = false;
  blockAll: boolean = false;

  constructor(private svc: SalesService,
              private renderer: Renderer,
              private notificationService: NotificationsService,
              private router: Router,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer) {
    this.data = {};
  }

  ngOnInit() {
    if (this.router.url.indexOf('new') != -1) {
      this.isEditMode = false;
    } else {
      this.isEditMode = true;
      this.getSalesDetails();
    }

  }

  getSalesDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.svc.getSalesById(parseInt(id)).subscribe(data => {
      this.sales = data;
      this.salesUrl = 'https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d2869.0043462972526!2d' + this.sales.latitude + '!3d' + this.sales.longitude + '!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ssr!2srs!4v1529128003032';
      this.salesUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.salesUrl);
    });
  }

  saveOnClick() {
      this.disableSave = true;
      this.blockAll = true;

      if (this.isEditMode) {

        this.svc.updateSales(this.sales)
          .finally(() => { this.isLoading = false; this.router.navigate(['/admin/sales']); })
          .subscribe((response: any) => {
            this.blockAll = false;
            this.handleResponse(response);
          });
      } else {
        this.svc.createSales(this.sales)
          .finally(() => { this.isLoading = false; this.router.navigate(['/admin/sales']); })
          .subscribe((response: any) => {
            this.blockAll = false;
            this.handleResponse(response);
            const id = +response._body;
            this.sales.id = id;
          });
      }
  }



  handleResponse(response: any) {
    this.disableSave = false;
    if (!response.ok) {
      const body = JSON.parse(response._body)
      this.notificationService.error(body.title, body.description,
        {
          timeOut: 5000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: false,
          maxLength: 100
        });
    } else {
      this.notificationService.success('Success', 'Sales saved successfully.',
        {
          timeOut: 5000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: false,
          maxLength: 100
        });
      this.isEditMode = true;
    }
  }

}

import { NgModule, Component, Input, Output, Directive, EventEmitter, Renderer, ElementRef, forwardRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SalesService } from '@app/admin/sales/sales.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Sales } from '@app/core/types/sales';
import { NotificationsService } from 'angular2-notifications';
import { DomSanitizer } from '@angular/platform-browser';
import { DeleteModalComponent } from '@app/shared/delete-modal/delete-modal';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-sales-view',
  templateUrl: './sales-view.component.html',
  styleUrls: ['./sales-view.component.scss']
})
export class SalesViewComponent implements OnInit {
  @ViewChild(DeleteModalComponent)
  private modal: DeleteModalComponent;
  image: any;
  data: any;
  sales: Sales = new Sales(0, '', '', '', '', '', '', '', '', '', '', '');
  salesUrl: any;
  link: any;
  isLoading: boolean;
  isEditMode: boolean = true;
  disableSave: boolean = false;
  blockAll: boolean = false;
  @ViewChild('gmap')
  gmapElement: ElementRef;
  map: google.maps.Map;

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
      const uluru = {lat: parseFloat(this.sales.latitude), lng: parseFloat(this.sales.longitude)};
      const mapProp = {
        center: uluru,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
      const marker = new google.maps.Marker({
        position: uluru,
        map: this.map
      });
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
      const body = JSON.parse(response._body);
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

  openModal() {
    this.modal.openModal();
  }

  performDelete(event: any) {
    this.svc.deleteSales(this.sales.id).subscribe(res => {
      this.router.navigate(['/admin/sales/']);
    });
  }

}

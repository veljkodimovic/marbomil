import { NgModule, Component, Input, Output, EventEmitter, Renderer, ElementRef, forwardRef, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '@app/admin/service/service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Service } from '@app/core/types/service';
import { NotificationsService } from 'angular2-notifications';
import { DomSanitizer } from '@angular/platform-browser';
import { DeleteModalComponent } from '@app/shared/delete-modal/delete-modal';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-service-view',
  templateUrl: './service-view.component.html',
  styleUrls: ['./service-view.component.scss']
})
export class ServiceViewComponent implements OnInit {
  @ViewChild(DeleteModalComponent)
  private modal: DeleteModalComponent;
  image: any;
  data: any;
  service: Service = new Service(0, '', '', '', '', '', '', '', '', '', '', '');
  serviceUrl: any;
  link: any;
  isLoading: boolean;
  isEditMode: boolean = true;
  disableSave: boolean = false;
  blockAll: boolean = false;
  @ViewChild('gmap')
  gmapElement: ElementRef;
  map: google.maps.Map;

  constructor(private svc: ServiceService,
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
      this.getServiceDetails();
    }

  }

  getServiceDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.svc.getServiceById(parseInt(id)).subscribe(data => {
      this.service = data;
      if (this.service.latitude.length && this.service.longitude.length) {
        const uluru = {lat: parseFloat(this.service.latitude), lng: parseFloat(this.service.longitude)};
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
      }
    });
  }

  saveOnClick() {
    this.disableSave = true;
    this.blockAll = true;

    if (this.isEditMode) {

      this.svc.updateService(this.service)
        .finally(() => { this.isLoading = false; this.router.navigate(['/admin/service']); })
        .subscribe((response: any) => {
          this.blockAll = false;
          this.handleResponse(response);
        });
    } else {
      this.svc.createService(this.service)
        .finally(() => { this.isLoading = false; this.router.navigate(['/admin/service']); })
        .subscribe((response: any) => {
          this.blockAll = false;
          this.handleResponse(response);
          const id = +response._body;
          this.service.id = id;
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
      this.notificationService.success('Success', 'Service saved successfully.',
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
    this.svc.deleteService(this.service.id).subscribe(res => {
      this.router.navigate(['/admin/service/']);
    });
  }

}

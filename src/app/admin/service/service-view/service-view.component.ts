import { NgModule, Component, Input, Output, EventEmitter, Renderer, ElementRef, forwardRef, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '@app/admin/service/service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Service } from '@app/core/types/service';
import { NotificationsService } from 'angular2-notifications';
import { DomSanitizer } from '@angular/platform-browser';
import { DeleteModalComponent } from '@app/shared/delete-modal/delete-modal';

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
      this.serviceUrl = 'https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d2869.0043462972526!2d' + this.service.latitude + '!3d' + this.service.longitude + '!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ssr!2srs!4v1529128003032';
      this.serviceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.serviceUrl);
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

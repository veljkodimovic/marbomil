import { NgModule, Component, Input, Output, EventEmitter, Renderer, ElementRef, forwardRef, OnInit, ViewChild } from '@angular/core';
import { AtestService } from '../atest.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Atest } from '@app/core/types/atest';
import { NotificationsService } from 'angular2-notifications';
import { DeleteModalComponent } from '@app/shared/delete-modal/delete-modal';

@Component({
  selector: 'app-atest-view',
  templateUrl: './atest-view.component.html',
  styleUrls: ['./atest-view.component.scss']
})
export class AtestViewComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild(DeleteModalComponent)
  private modal: DeleteModalComponent;
  data: any;
  atest: Atest = new Atest(0, '', '', '');
  link: any;
  isLoading: boolean;
  isEditMode: boolean = true;
  disableSave: boolean = false;
  blockAll: boolean = false;

  constructor(private svc: AtestService,
              private renderer: Renderer,
              private notificationService: NotificationsService,
              private router: Router,
              private route: ActivatedRoute) {
    this.data = {};
  }

  ngOnInit() {
    if (this.router.url.indexOf('new') != -1) {
      this.isEditMode = false;
    } else {
      this.isEditMode = true;
      this.getAtestDetails();
    }

  }

  getAtestDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.svc.getAtestById(parseInt(id)).subscribe(data => {
      this.atest = data;
    });
  }

  saveOnClick() {
    this.disableSave = true;
    this.blockAll = true;

    if (this.isEditMode) {

      this.svc.updateAtest(this.atest)
        .finally(() => { this.isLoading = false; this.router.navigate(['/admin/atest']); })
        .subscribe((response: any) => {
          this.blockAll = false;
          this.handleResponse(response);
        });
    } else {
      this.svc.createAtest(this.atest)
        .finally(() => { this.isLoading = false; this.router.navigate(['/admin/atest']); })
        .subscribe((response: any) => {
          this.blockAll = false;
          this.handleResponse(response);
          const id = +response._body;
          this.atest.id = id;

        });
    }
  }

  onFileChange(event: any) {
    const that = this;
    console.log(that);
    if(event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      that.atest.file = file;
      console.log(that);
      // this.atest.file.setValue(file);
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
      this.notificationService.success('Success', 'Atest saved successfully.',
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
    this.svc.deleteAtest(this.atest.id).subscribe(res => {
      this.router.navigate(['/admin/atest/']);
    });
  }

}

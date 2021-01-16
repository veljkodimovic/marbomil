import { Component, Renderer, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  atest: Atest = new Atest(0, '', '', '', '', '');
  link: any;
  isLoading: boolean;
  isEditMode = true;
  disableSave = false;
  blockAll = false;
  @ViewChild('file') file: ElementRef;

  constructor(private svc: AtestService,
    private renderer: Renderer,
    private notificationService: NotificationsService,
    private router: Router,
    private route: ActivatedRoute) {
    this.data = {};
  }

  ngOnInit() {
    this.isLoading = true;
    if (this.router.url.indexOf('new') !== -1) {
      this.isEditMode = false;
      setTimeout(() => {
        this.isLoading = false;
      }, 300);
    } else {
      this.isEditMode = true;
      this.getAtestDetails();
    }

  }

  getAtestDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.svc.getAtestById(Number(id)).subscribe(data => {
      this.atest = data;
      this.isLoading = false;
    });
  }

  saveOnClick() {
    this.isLoading = true;
    this.disableSave = true;
    this.blockAll = true;

    if (this.isEditMode) {
      delete this.atest.fileUrl;
      if (!this.atest.file) {
        this.atest.file = '';
        this.atest.fileExtension = '';
      }
      this.svc.updateAtest(this.atest)
        .finally(() => { this.isLoading = false; })
        .subscribe((response: any) => {
          this.blockAll = false;
          this.handleResponse(response);
        });
    } else {
      this.svc.createAtest(this.atest)
        .finally(() => { this.isLoading = false; })
        .subscribe((response: any) => {
          this.blockAll = false;
          this.handleResponse(response);
          const id = +response._body;
          this.atest.id = id;

        });
    }
  }

  calculateKBFromBytes(bytes: number): number {
    return Math.round(bytes / 1024);
  }

  onFileChange($event: any) {
    const re = /(?:\.([^.]+))?$/;

    const file: File = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    const that = this;

    myReader.onloadend = function (loadEvent: any) {
      const sizeKb = that.calculateKBFromBytes(+loadEvent.loaded);
      if (sizeKb > 20 * 1024) {
        that.file.nativeElement.value = '';
        that.notificationService.error('File size', 'Maximum file size should be 20MB.',
          {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: false,
            maxLength: 100
          });
      } else {
        that.atest.fileExtension = '.' + re.exec(file.name)[1];
        that.atest.file = loadEvent.target.result;
        that.atest.file = that.atest.file.replace('data:application/pdf;base64,', '');
        that.notificationService.success('Fajl je učitan', 'Izabrani fajl je uspešno učitan',
          {
            timeOut: 2000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: false,
            maxLength: 100
          });
      }
    };
    myReader.readAsDataURL(file);
  }

  handleResponse(response: any) {
    this.disableSave = false;
    if (!response.ok) {
      const body = JSON.parse(response._body);
      if (body.title) {
        this.notificationService.error(body.title, body.description,
          {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: false,
            maxLength: 100
          });
      } else {
        let description = '';
        for (const errorDescription of body) {
          description += errorDescription + '<br>';
        }
        this.notificationService.warn('Greška pri snimanju', description,
          {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: false,
            maxLength: 100
          });
      }
    } else {
      this.notificationService.success('Success', 'Atest je uspešno sačuvan.',
        {
          timeOut: 1000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: false,
          maxLength: 100
        });
      this.isEditMode = true;
      setTimeout(() => {
        this.router.navigate(['/admin/atest']);
      }, 1000);
    }
  }

  uploadImage() {
    console.log('Formaaa');
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

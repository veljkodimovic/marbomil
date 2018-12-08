import { NgModule, Component, Input, Output, EventEmitter, Renderer, ElementRef, forwardRef, OnInit, ViewChild } from '@angular/core';
import { Catalogue } from '@app/core/types/catalogue';
import { CatalogueService } from '@app/admin/catalogue/catalogue.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DeleteModalComponent } from '@app/shared/delete-modal/delete-modal';
import { UploadService } from '@app/shared/upload/upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-catalogue-view',
  templateUrl: './catalogue-view.component.html',
  styleUrls: ['./catalogue-view.component.scss']
})
export class CatalogueViewComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild(DeleteModalComponent)
  private modal: DeleteModalComponent;
  data: any;
  catalogue: Catalogue = new Catalogue(0, '', '', '', '', '', '');
  link: any;
  isLoading: boolean;
  isEditMode: boolean = true;
  disableSave: boolean = false;
  blockAll: boolean = false;
  @ViewChild('file') file: ElementRef;

  constructor(private svc: CatalogueService,
              private renderer: Renderer,
              private notificationService: NotificationsService,
              private router: Router,
              private upload: UploadService,
              private route: ActivatedRoute) {
    this.data = {};
  }

  ngOnInit() {
    if (this.router.url.indexOf('new') != -1) {
      this.isEditMode = false;
    } else {
      this.isEditMode = true;
      this.getCatalogueDetails();
    }

  }

  getCatalogueDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.svc.getCatalogueById(parseInt(id)).subscribe(data => {
      this.catalogue = data;
    });
  }

  saveOnClick() {
    this.disableSave = true;
    this.blockAll = true;

    if (this.isEditMode) {
      delete this.catalogue.fileUrl;
      if (!this.catalogue.file) {
        this.catalogue.file = '';
        this.catalogue.fileExtension = '';
      }
      this.svc.updateCatalogue(this.catalogue)
        .finally(() => { this.isLoading = false; })
        .subscribe((response: any) => {
          this.blockAll = false;
          this.handleResponse(response);
        });
    } else {
      this.svc.createCatalogue(this.catalogue)
        .finally(() => { this.isLoading = false; })
        .subscribe((response: any) => {
          this.blockAll = false;
          this.handleResponse(response);
          var id = +response._body;
          this.catalogue.id = id;

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
      if (sizeKb > 1024) {
        that.file.nativeElement.value = '';
        that.notificationService.error('File size', 'Maximum file size should be 1MB.',
          {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: false,
            maxLength: 100
          });
      } else {
        that.catalogue.fileExtension =  '.' + re.exec(file.name)[1];
        that.catalogue.file = loadEvent.target.result;
        that.catalogue.file = that.catalogue.file.replace('data:application/pdf;base64,', '');
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
    }
    else {
      this.notificationService.success('Success', 'Katalog je uspešno sačuvan',
        {
          timeOut: 1000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: false,
          maxLength: 100
        });
      setTimeout(() => {
        this.router.navigate(['/admin/catalogue']);
      }, 1000);
      this.isEditMode = true;
    }
  }

  openModal() {
    this.modal.openModal();
  }

  performDelete(event: any) {
    this.svc.deleteCatalogue(this.catalogue.id).subscribe(res => {
      this.router.navigate(['/admin/catalogue/']);
    });
  }

  // At the drag drop area
  // (drop)="onDropFile($event)"
  onDropFile(event: DragEvent) {
    event.preventDefault();
    this.uploadFile(event.dataTransfer.files);
  }

  // At the drag drop area
  // (dragover)="onDragOverFile($event)"
  onDragOverFile(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }

  // At the file input element
  // (change)="selectFile($event)"
  selectFile(event: any) {
    this.uploadFile(event.target.files);
  }

  uploadFile(files: FileList) {
    if (files.length == 0) {
      console.log("No file selected!");
      return

    }
    const file: File = files[0];

    this.upload.uploadFile("/assets/files/", file)
      .subscribe(
        event => {
          if (event.type == HttpEventType.UploadProgress) {
            const percentDone = Math.round(100 * event.loaded / event.total);
            console.log(`File is ${percentDone}% loaded.`);
          } else if (event instanceof HttpResponse) {
            console.log('File is completely loaded!');
          }
        },
        (err) => {
          console.log("Upload Error:", err);
        }, () => {
          console.log("Upload done");
        }
      )
  }

}

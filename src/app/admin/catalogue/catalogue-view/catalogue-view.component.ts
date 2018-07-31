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
  catalogue: Catalogue = new Catalogue(0, '', '', '', '');
  link: any;
  isLoading: boolean;
  isEditMode: boolean = true;
  disableSave: boolean = false;
  blockAll: boolean = false;

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

      this.svc.updateCatalogue(this.catalogue)
        .finally(() => { this.isLoading = false; this.router.navigate(['/admin/catalogue']); })
        .subscribe((response: any) => {
          this.blockAll = false;
          this.handleResponse(response);
        });
    }
    else {
      this.svc.createCatalogue(this.catalogue)
        .finally(() => { this.isLoading = false; this.router.navigate(['/admin/catalogue']); })
        .subscribe((response: any) => {
          this.blockAll = false;
          this.handleResponse(response);
          var id = +response._body;
          this.catalogue.id = id;

        });
    }
  }

  onFileChange(event: any) {
    var that = this;
    console.log(that);
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      console.log(file);
      that.catalogue.file = file;
      console.log(that);
      // this.catalogue.file.setValue(file);
    }
  }

  handleResponse(response: any) {
    this.disableSave = false;
    if (!response.ok) {
      var body = JSON.parse(response._body);
      this.notificationService.error(body.title, body.description,
        {
          timeOut: 5000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: false,
          maxLength: 100
        });
    }
    else {
      this.notificationService.success('Success', 'Catalogue saved successfully.',
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

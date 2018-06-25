import { Component, NgModule, Renderer, Input, Output, EventEmitter, ElementRef, forwardRef, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CollectionService } from '../collections.service';
import { FormsModule } from "@angular/forms";
import { NotificationsService } from 'angular2-notifications';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { Router, ActivatedRoute } from '@angular/router';
import { Collection } from '@app/core/types/collection';
import { DeleteModalComponent } from '@app/shared/delete-modal/delete-modal';

@Component({
  selector: 'app-collection-view',
  templateUrl: './collection-view.component.html',
  styleUrls: ['./collection-view.component.scss']
})
export class CollectionViewComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('fileInput2') fileInput2: ElementRef;
  @ViewChild(DeleteModalComponent)
  private modal: DeleteModalComponent;
  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;
  collectionId: number = 0;
  image: any;
  data: any;
  logoData: any;
  datePicker: any;
  hideLogoText: boolean = false;
  private sub: any;
  isLoading: boolean;
  cropperSettings: CropperSettings;
  isEditMode: boolean = false;
  collection: Collection = new Collection(0, '', '', '', '', null, null);
  collections: Collection[] = [];
  categories: any[] = [];
  products: any[];
  setImage: boolean = false;
  setImageLogo: boolean = false;
  modalState: boolean = false;
  originalImg: string = "";
  appType: string;
  difCount: number;
  diffs: number[] = [];
  difNumber: number = 4;
  productsCount: number = 0;
  disableSave: boolean = false;
  minDate: string;
  blockAll: boolean = false;
  constructor(private svc: CollectionService,
    private router: Router,
    private renderer: Renderer,
    private notificationService: NotificationsService,
    private route: ActivatedRoute) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 900;
    this.cropperSettings.height = 600;
    this.cropperSettings.croppedWidth = 900;
    this.cropperSettings.croppedHeight = 600;
    this.cropperSettings.canvasWidth = 360;
    this.cropperSettings.canvasHeight = 240;
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.keepAspect = true;
    this.cropperSettings.preserveSize = true;
    this.data = {};
  }

  ngOnInit() {
    if (this.router.url.indexOf('new') != -1) {
      this.isEditMode = false;
    } else {
      this.isEditMode = true;
      this.getCollectionDetails();
    }

    this.svc.getAllCollections().subscribe((data: any) => {
      this.collections = data;
      this.collections.splice(this.collections.indexOf(this.collection), 1);
    });

    this.svc.getAllCategories().subscribe((data: any) => {
      this.categories = data;
    });

  }

  getCollectionDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.svc.getCollectionById(parseInt(id)).subscribe((data: any) => {
      this.collection = data;
      var image: any = new Image();
      image.src = 'data:image/jpeg;base64,' + this.collection.image;
      this.cropper.settings = this.cropperSettings;
      this.cropper.setImage(image);
    });
  }

  fileChangeListener($event: any) {
    var image: any = new Image();
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function(loadEvent: any) {
      image.src = loadEvent.target.result;
      that.originalImg = image.src;
      that.cropper.setImage(image);
      that.setImage = true;
    };

    myReader.readAsDataURL(file);
  }

  uploadImage() {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      this.fileInput.nativeElement, 'dispatchEvent', [event]);
  }

  removeImage() {
    this.data = {};
    this.cropper.reset();
  }

  handleResponse(response: any) {
    this.disableSave = false;
    if (!response.ok) {
      var body = JSON.parse(response._body)
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
      this.notificationService.success('Success', 'Banner saved successfully.',
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

  saveOnClick() {
    if (this.data.image) {

      this.disableSave = true;
      this.blockAll = true;
      if (this.collection.id == this.collection.parentId) {
        this.collection.parentId = null;
        this.notificationService.warn('Wrong parent data', 'You can not add this collection to parent collection!',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: false,
            maxLength: 100
          });
        return;
      }

      var imageString = this.data.image.split('base64,');
      if (this.setImage) {
        this.collection.imageCrop = imageString[imageString.length - 1];
        var imageStringOrig = this.originalImg.split('base64,');
        this.collection.image = imageStringOrig[imageStringOrig.length - 1];
      }
      if (this.isEditMode) {

        this.svc.updateCollection(this.collection)
          .finally(() => { this.isLoading = false; this.router.navigate(['/admin/collection']); })
          .subscribe((response: any) => {
            this.blockAll = false;
            this.handleResponse(response);
          });
      }
      else {
        this.svc.createCollection(this.collection)
          .finally(() => { this.isLoading = false; this.router.navigate(['/admin/collection']); })
          .subscribe((response: any) => {
            this.blockAll = false;
            this.handleResponse(response);
            var id = +response._body;
            this.collection.id = id;

          });
      }
    } else {
      this.notificationService.warn('Missing data', 'You need to add image!',
        {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: false,
          maxLength: 100
        });
    }
  }

  openModal() {
    this.modal.openModal();
  }

  performDelete(event: any) {
    this.svc.deleteCollection(this.collection.id).subscribe(res => {
      this.router.navigate(['/admin/collection/']);
    });
  }

}

import { Component, Renderer, ElementRef, forwardRef, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CollectionService } from '../collections.service';
import { FormsModule } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { Router, ActivatedRoute } from '@angular/router';
import { Collection } from '@app/core/types/collection';
import { DeleteModalComponent } from '@app/shared/delete-modal/delete-modal';
import { PersistenceService } from '@app/core/persistence.service';

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
  collectionId = 0;
  image: any;
  data: any;
  logoData: any;
  datePicker: any;
  hideLogoText = false;
  private sub: any;
  isLoading: boolean;
  cropperSettings: CropperSettings;
  isEditMode = false;
  collection: Collection = new Collection(0, '', '', '', '', '', '.jpg', null);
  collections: Collection[] = [];
  categories: any[] = [];
  products: any[];
  setImage = false;
  setImageLogo = false;
  modalState = false;
  originalImg = '';
  appType: string;
  difCount: number;
  diffs: number[] = [];
  difNumber = 4;
  productsCount = 0;
  disableSave = false;
  minDate: string;
  blockAll = false;
  fileType: string;
  constructor(private svc: CollectionService,
    private router: Router,
    private renderer: Renderer,
    private notificationService: NotificationsService,
    private persistenceService: PersistenceService,
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
    this.isLoading = true;
    if (this.router.url.indexOf('new') !== -1) {
      this.isEditMode = false;
      setTimeout(() => {
        this.isLoading = false;
      }, 300);
    } else {
      this.isEditMode = true;
      this.getCollectionDetails();
    }

    this.svc.getAllCollections().subscribe((data: any) => {
      this.collections = data;
      this.collections.splice(this.collections.indexOf(this.collection), 1);
      this.svc.getAllCategories().subscribe((dataC: any) => {
        this.categories = dataC;
        this.isLoading = false;
      });
    });
  }

  getCollectionDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const that = this;
    this.svc.getCollectionEditById(Number(id)).subscribe((data: any) => {
      this.collection = data;
      that.data.image = 'data:image/jpeg;base64,' + this.collection.image;
      const image: any = new Image();
      image.src = 'data:image/jpeg;base64,' + this.collection.image;
      this.cropper.settings = this.cropperSettings;
      this.cropper.setImage(image);
    });
  }

  fileChangeListener($event: any) {
    const image: any = new Image();
    const file: File = $event.target.files[0];
    this.fileType = file.name;
    this.fileType = this.fileType.slice(-4);
    const myReader: FileReader = new FileReader();
    const that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.originalImg = image.src;
      that.cropper.setImage(image);
      that.setImage = true;
    };

    myReader.readAsDataURL(file);
  }

  uploadImage() {
    const event = new MouseEvent('click', { bubbles: true });
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
      this.notificationService.success('Success', 'Kolekcija je uspešno sačuvana.',
        {
          timeOut: 1000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: false,
          maxLength: 100
        });
      this.isEditMode = true;
      setTimeout(() => {
        this.router.navigate(['/admin/collection']);
      }, 1000);
    }
  }

  saveOnClick() {
    this.disableSave = true;
    this.blockAll = true;
    let noChanges = true;
    this.isLoading = true;
    if (!this.data.image) {
      noChanges = false;
      this.collection.image = this.persistenceService.placeholderImage;
      this.collection.imageCrop = this.persistenceService.placeholderImage;
      this.collection.imageExtension = this.persistenceService.placeholderExtension;
    } else {
      const imageString = this.data.image.split('base64,');
      if (this.setImage) {
        this.collection.imageCrop = imageString[imageString.length - 1];
        const imageStringOrig = this.originalImg.split('base64,');
        this.collection.image = imageStringOrig[imageStringOrig.length - 1];
        this.collection.imageExtension = this.fileType;
      }
    }
    if (this.isEditMode) {
      if (!this.setImage && noChanges) {
        this.collection.image = null;
        this.collection.imageCrop = null;
      }
      this.svc.updateCollection(this.collection)
        .finally(() => { this.isLoading = false; })
        .subscribe((response: any) => {
          this.blockAll = false;
          this.handleResponse(response);
        });
    } else {
      this.svc.createCollection(this.collection)
        .finally(() => { this.isLoading = false; })
        .subscribe((response: any) => {
          this.blockAll = false;
          this.handleResponse(response);
          const id = +response._body;
          this.collection.id = id;

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

import { Component, Renderer, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { NotificationsService } from 'angular2-notifications';
import { Product } from '../../../core/types/product';
import { Collection } from '../../../core/types/collection';
import { Category } from '../../../core/types/category';
import { ImageModel } from '../../../core/types/imageModel';
import { DeleteModalComponent } from '../../../shared/delete-modal/delete-modal';
import { PersistenceService } from '@app/core/persistence.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';


@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('fileInput2') fileInput2: ElementRef;
  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;
  @ViewChild('cropper2', undefined)
  cropper2: ImageCropperComponent;
  cropperSettings: CropperSettings;
  cropperSettings2: CropperSettings;
  @ViewChild(DeleteModalComponent)
  private modal: DeleteModalComponent;
  private apiUrl: string;
  image: any;
  data: any;
  data2: any;
  product: Product = new Product(0, '', '', '', 0, 0, 0, '', null, null, '', 0, 0, 0, 0, [], '', '', '.jpg');
  link: any;
  isLoading: boolean;
  setImage = false;
  setImageDrawing = false;
  originalImg = '';
  isEditMode = true;
  isImageEdit = false;
  disableSave = false;
  blockAll = false;
  activeImageIndex = -1;
  images: ImageModel[] = [];
  deletedImages: number[] = [];
  productImages: any[] = [];
  productImagesBases: any[] = [];
  cropedOriginalImages: any[] = [];
  collections: Collection[] = [];
  collectionData: Collection[] = [];
  collectionsRoot: Collection[] = [];
  collectionDisabled = true;
  categories: Category[] = [];
  activeImageIndexNew = -1;
  activeImageIndexUpdated = -1;
  nestoImage: any;
  fileType: string;
  fileType2: string;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '5rem',
    placeholder: '',
    translate: 'no'
  };
  constructor(private svc: ProductService, private renderer: Renderer,
    private notificationService: NotificationsService,
    private persistenceService: PersistenceService,
    private router: Router,
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
    // this.cropperSettings.preserveSize = true;

    this.cropperSettings2 = new CropperSettings();
    this.cropperSettings2.noFileInput = true;
    this.cropperSettings2.width = 300;
    this.cropperSettings2.height = 400;
    this.cropperSettings2.croppedWidth = 300;
    this.cropperSettings2.croppedHeight = 400;
    this.cropperSettings2.canvasWidth = 300;
    this.cropperSettings2.canvasHeight = 400;

    this.data = {};
    this.data2 = {};
    this.apiUrl = persistenceService.apiUrl;
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
      this.getProductDetails();
    }

    this.svc.getAllCollections().subscribe((data: any) => {
      this.collectionData = data;
      this.svc.getAllCategories().subscribe((dataC: any) => {
        this.categories = dataC;
      });
    });
  }

  updateCollections() {
    const categoryId = this.product.categoryId;
    this.collections = this.collectionData;
    this.collections = this.collections.filter((x: any) => x.categoryId === categoryId);
    this.collectionDisabled = this.collections.length ? false : true;
  }

  getProductDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const that = this;
    this.isImageEdit = true;
    this.svc.getProductEditById(Number(id)).subscribe(data => {
      this.product = data;
      this.updateCollections();
      let firstImage = true;
      for (const value of this.product.images) {
        if (firstImage) {
          that.data.image = value.imageUrl;
          firstImage = false;
        }
        value.imageCrop = this.apiUrl + '/' + value.imageCropUrl;
        this.images.push(value);
      }
      if (this.product.drawingImage.length > 50) {
        that.data2.image = 'data:image/jpeg;base64,' + this.product.drawingImage;
        const image2: any = new Image();
        image2.src = that.data2.image;
        this.cropper2.settings = this.cropperSettings2;
        this.cropper2.setImage(image2);
      }
      this.isLoading = false;
    });
  }

  uploadImage() {
    const event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      this.fileInput.nativeElement, 'dispatchEvent', [event]);
  }

  removeImage() {

    this.fileInput.nativeElement.value = '';

    this.productImagesBases.splice(this.activeImageIndex, 1);
    this.productImages.splice(this.activeImageIndex, 1);
    this.cropper.reset();
    const image = this.images.find(x => x.index === this.activeImageIndex);
    if (image && image.id > 0) {
      image.isDeleted = true;
      this.deletedImages.push(image.id);
    }
    this.images.splice(this.activeImageIndex, 1);
    let index = 0;
    for (const imageSingle of this.images) {
      imageSingle.index = index;
      imageSingle.isDirty = true;
      index++;
    }

    if (this.images.length > 0) {
      this.setActiveImage(this.images.find(x => x.index === 0));
    }
  }

  setActiveImage(imageModel: any) {
    this.activeImageIndex = imageModel.index;
    const image: any = new Image();
    if (this.isEditMode) {
      this.svc.getProductImageByID(imageModel.id).subscribe(data => {
        const activeImage = this.images.find(x => x.index === data.index);
        image.src = 'data:image/jpeg;base64,' + data.image;
        activeImage.image = image.src;
        activeImage.imageExtension = data.imageExtension;
        this.isImageEdit = false;
        this.cropper.setImage(image);
      });
    } else {
      image.src = this.images.find(x => x.index === imageModel.index).image;
      this.cropper.setImage(image);
    }
  }

  calculateKBFromBytes(bytes: number): number {
    return Math.round(bytes / 1024);
  }

  openModal() {
    this.modal.openModal();
  }

  performDelete(event: any) {
    this.svc.deleteProduct(this.product.id).subscribe(res => {
      this.router.navigate(['/admin/product/']);
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

      that.cropper.setImage(image);
      const imageModel = new ImageModel();
      imageModel.image = loadEvent.target.result;
      imageModel.index = that.images.length;
      imageModel.imageExtension = that.fileType;
      that.images.push(imageModel);
      that.productImagesBases.push(loadEvent.target.result);

      if (that.isEditMode) {
        imageModel.isNew = true;
      }
      that.setActiveImage(imageModel);
      that.setImage = true;

    };
    myReader.readAsDataURL(file);
  }

  fileChangeListener2($event: any) {
    const image: any = new Image();
    const file: File = $event.target.files[0];
    this.fileType2 = file.name;
    this.fileType2 = this.fileType2.slice(-4);
    const myReader: FileReader = new FileReader();
    const that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.originalImg = image.src;
      that.cropper2.setImage(image);
      that.setImageDrawing = true;
    };
    myReader.readAsDataURL(file);
  }

  cropped(event: any) {
    const image = this.images.find(x => x.index === this.activeImageIndex);
    if (image) {
      image.imageCrop = this.data.image;
      if (image.id > 0) {
        image.isDirty = true;
      }
    }

  }

  saveOnClick() {
    this.isLoading = true;
    this.product.images = [];
    this.product.orderNumber = this.product.orderNumber;
    this.disableSave = true;
    this.blockAll = true;
    if (!this.isEditMode) {
      if (this.images.length > 0) {
        for (const value of this.images) {
          const imageString = value.imageCrop.split('base64,');
          const imageStringOrig = this.images[value.index].image.split('base64,');
          this.product.images.push({
            id: 0, index: value.index,
            imageCrop: imageString[imageString.length - 1],
            image: imageStringOrig[imageStringOrig.length - 1],
            imageExtension: value.imageExtension
          });
        }
      } else {
        this.product.images.push({
          id: 0, index: 0,
          image: this.persistenceService.placeholderImage,
          imageCrop: this.persistenceService.placeholderImage,
          imageExtension: this.persistenceService.placeholderExtension
        });
      }
    }

    if (this.data2.image) {
      const imageString2 = this.data2.image.split('base64,');
      if (this.setImageDrawing) {
        this.product.drawingImage = imageString2[imageString2.length - 1];
        this.product.drawingImageExtension = this.fileType2;
        //  var imageStringOrig = this.originalImg.split('base64,');
        // this.collection.image = imageStringOrig[imageStringOrig.length - 1];
      }
    }

    if (this.isEditMode) {
      for (const value of this.images) {
        if (value.image) {
          const imageString = value.image.split('base64,');
          const imageStringCropp = value.imageCrop.split('base64,');
          this.product.images.push({
            id: value.id,
            index: value.index,
            imageCrop: imageStringCropp[imageStringCropp.length - 1],
            image: imageString[imageString.length - 1],
            imageExtension: value.imageExtension,
            productId: value.productId
          });
        } else {
          this.product.images.push({
            id: value.id,
            index: value.index,
            productId: value.productId
          });
        }
      }
      if (this.product.images.length === 0) {
        this.product.images.push({
          id: 0, index: 0,
          image: this.persistenceService.placeholderImage,
          imageCrop: this.persistenceService.placeholderImage,
          imageExtension: this.persistenceService.placeholderExtension
        });
      }
      this.svc.updateProduct(this.product)
        .finally(() => { this.isLoading = false; })
        .subscribe((response: any) => {
          this.blockAll = false;
          this.handleResponse(response);
          // this.router.navigate(['/admin/product']);
        });
    } else {
      this.svc.createProduct(this.product)
        .finally(() => { this.isLoading = false; })
        .subscribe((response: any) => {
          this.blockAll = false;
          this.handleResponse(response);
          // this.router.navigate(['/admin/product']);
        });
    }
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
      this.notificationService.success('Success', 'Proizvod je uspešno sačuvan.',
        {
          timeOut: 1000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: false,
          maxLength: 100
        });
      setTimeout(() => {
        // tslint:disable-next-line:max-line-length
        this.router.navigate(['/admin/product'], { queryParams: { categoryId: this.product.categoryId, collectionId: this.product.collectionId } });
      }, 1000);
      this.isEditMode = true;
    }
  }

  scrollTop(f: NgForm) {
    if (!f.form.valid) {
      const scrollToTop = window.setInterval(() => {
        const pos = window.pageYOffset;
        if (pos > 0) {
          window.scrollTo(0, pos - 20); // how far to scroll on each step
        } else {
          window.clearInterval(scrollToTop);
        }
      }, 16);
    }
  }

  uploadImage2() {
    const event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      this.fileInput2.nativeElement, 'dispatchEvent', [event]);
  }

  removeImage2() {
    this.data2 = {};
    this.cropper2.reset();
    this.product.drawingImage = null;
    this.product.drawingImageExtension = '';
  }


}

import { NgModule, Component, Input, Output, EventEmitter, Renderer, ElementRef, forwardRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { NotificationsService } from 'angular2-notifications';
import { Product } from '../../../core/types/product';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;
  cropperSettings: CropperSettings;
  image: any;
  data: any;
  product: Product = new Product(0, "", "", "", 0, 0, "", 0, 0, 0, 0, 0, 0, [], "");
  link: any;
  isLoading: boolean;
  setImage: boolean = false;
  originalImg: string = '';
  isEditMode: boolean = true;
  disableSave: boolean = false;
  blockAll: boolean = false;
  activeImageIndex: number = -1;
  images: any[] = [];
  deletedImages: number[] = [];
  productImages: any[] = [];
  productImagesBases: any[] = [];
  cropedOriginalImages: any[] = [];
  collections: any[] = [];
  categories: any[] = [];
  activeImageIndexNew: number = -1;
  activeImageIndexUpdated: number = -1;
  nestoImage: any;
  constructor(private svc: ProductService, private renderer: Renderer,
    private notificationService: NotificationsService,
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
    this.cropperSettings.preserveSize = true;
    this.data = {};
  }

  ngOnInit() {
    if (this.router.url.indexOf('new') != -1) {
      this.isEditMode = false;
    }
    else {
      this.isEditMode = true;
      this.getProductDetails();
    }

    this.svc.getAllCollections().subscribe((data: any) => {
      this.collections = data;
    });

    this.svc.getAllCategories().subscribe((data: any) => {
      this.categories = data;
    });


  }

  getProductDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.svc.getProductById(parseInt(id)).subscribe(data => {
      this.product = data;
      for (let value of this.product.images) {
        value.imageCrop = 'data:image/jpeg;base64,' + value.imageCrop;
        value.image = 'data:image/jpeg;base64,' + value.image;
        this.images.push(value);
        console.log(this.images);

      }

    });
  }

  uploadImage() {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      this.fileInput.nativeElement, 'dispatchEvent', [event]);
  }

  removeImage() {

    this.fileInput.nativeElement.value = "";

    this.productImagesBases.splice(this.activeImageIndex, 1);
    this.productImages.splice(this.activeImageIndex, 1);
    this.cropper.reset();
    var image = this.images.find(x => x.index == this.activeImageIndex);
    if (image && image.id > 0) {
      image.isDeleted = true;
      this.deletedImages.push(image.id);
    }
    this.images.splice(this.activeImageIndex, 1);
    var index = 0;
    for (let image of this.images) {
      image.index = index;
      image.isDirty = true;
      index++;
    }


    if (this.images.length > 0) {
      this.setActiveImage(this.images.find(x => x.index == 0));
    }
  }

  setActiveImage(imageModel: any) {
    this.activeImageIndex = imageModel.index;
    var image: any = new Image();
    image.src = this.images.find(x => x.index == imageModel.index).image;
    this.cropper.setImage(image);

  }

  calculateKBFromBytes(bytes: number): number {
    return Math.round(bytes / 1024);
  }


  fileChangeListener($event: any) {
    var image: any = new Image();
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    var that = this;

    myReader.onloadend = function(loadEvent: any) {
      var sizeKb = that.calculateKBFromBytes(+loadEvent.loaded);
      if (sizeKb > 500) {
        that.fileInput.nativeElement.value = "";
        that.notificationService.error('Image size', 'Maximum image size should be 500 KB.',
          {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: false,
            maxLength: 100
          });
      } else {
        image.src = loadEvent.target.result;

        that.cropper.setImage(image);
        var imageModel: any;
        imageModel.image = loadEvent.target.result;
        imageModel.index = that.images.length;
        that.images.push(imageModel);
        that.productImagesBases.push(loadEvent.target.result);

        if (that.isEditMode) {
          imageModel.isNew = true;
        }
        that.setActiveImage(imageModel);
      }



    };
    myReader.readAsDataURL(file);
  }

  cropped(event: any) {
    var image = this.images.find(x => x.index == this.activeImageIndex);
    if (image) {
      image.imageCrop = this.data.image;
      if (image.id > 0) {
        image.isDirty = true;
      }
    }

  }

  saveOnClick() {

    this.product.images = [];
    this.product.newImages = [];
    this.product.updatedImages = [];
    this.product.deletedImages = [];
    if (this.images.length > 0) {
      this.disableSave = true;
      this.blockAll = true;
      var index = 0;
      var indexFile = 0;
      if (!this.isEditMode) {
        for (let value of this.images) {
          var imageString = value.imageCrop.split('base64,');
          var imageStringOrig = this.images[value.index].image.split('base64,')
          this.product.images.push({ id: 0, index: value.index, imageCrop: imageString[imageString.length - 1], image: imageStringOrig[imageStringOrig.length - 1] });
        }
      } else {
        //Images
        for (let value of this.images.filter(x => x.isNew)) {
          var imageString = value.imageCrop.split('base64,');
          var imageStringOrig = this.images[value.index].image.split('base64,')
          this.product.newImages.push({ id: 0, index: value.index, imageCrop: imageString[imageString.length - 1], image: imageStringOrig[imageStringOrig.length - 1] });
        }
        for (let value of this.images.filter(x => x.isDirty && !x.isNew && !x.isDeleted)) {
          var imageString = value.imageCrop.split('base64,');
          var imageStringOrig = this.images[value.index].image.split('base64,')
          this.product.updatedImages.push({ id: value.id, index: value.index, imageCrop: imageString[imageString.length - 1], image: imageStringOrig[imageStringOrig.length - 1] });
        }
        this.product.deletedImages = this.deletedImages;
      }

      if (this.isEditMode) {
        this.svc.updateProduct(this.product)
          .finally(() => { this.isLoading = false; })
          .subscribe((response: any) => {
            this.blockAll = false;
            this.handleResponse(response);
          });
      }
      else {
        this.svc.createProduct(this.product)
          .finally(() => { this.isLoading = false; })
          .subscribe((response: any) => {
            this.blockAll = false;
            this.handleResponse(response);
          });
      }

    } else {
      this.notificationService.warn('Missing data', 'You need to add at least one image!',
        {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: false,
          maxLength: 100
        });
    }
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
    } else {
      this.notificationService.success('Success', 'Offer saved successfully.',
        {
          timeOut: 5000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: false,
          maxLength: 100
        });
    }
    this.isEditMode = true;
  }


}

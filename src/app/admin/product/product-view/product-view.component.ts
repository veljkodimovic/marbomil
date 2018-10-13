import { NgModule, Component, Input, Output, EventEmitter, Renderer, ElementRef, forwardRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { NotificationsService } from 'angular2-notifications';
import { Product } from '../../../core/types/product';
import { Collection } from '../../../core/types/collection';
import { Category } from '../../../core/types/category';
import { ImageModel } from '../../../core/types/imageModel';
import { DeleteModalComponent } from '../../../shared/delete-modal/delete-modal';
import { ImageCropperModule } from 'ngx-image-cropper';


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
  @ViewChild(DeleteModalComponent)
  private modal: DeleteModalComponent;
  image: any;
  data: any;
  data2: any;
  product: Product = new Product(0, '', '', '', 0, 0, '', 0, 0, 0, 0, 0, 0, [], '', '', '.jpg');
  link: any;
  isLoading: boolean;
  setImage: boolean = false;
  setImageDrawing: boolean = false;
  originalImg: string = '';
  isEditMode: boolean = true;
  disableSave: boolean = false;
  blockAll: boolean = false;
  activeImageIndex: number = -1;
  images: ImageModel[] = [];
  deletedImages: number[] = [];
  productImages: any[] = [];
  productImagesBases: any[] = [];
  cropedOriginalImages: any[] = [];
  collections: Collection[] = [];
  collectionsParents: Collection[] = [];
  collectionsRoot: Collection[] = [];
  categories: Category[] = [];
  activeImageIndexNew: number = -1;
  activeImageIndexUpdated: number = -1;
  nestoImage: any;
  fileType: string;
  fileType2: string;
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
    this.data2 = {};
  }

  ngOnInit() {
    if (this.router.url.indexOf('new') != -1) {
      this.isEditMode = false;
    } else {
      this.isEditMode = true;
      this.getProductDetails();
    }

    this.svc.getAllCollections().subscribe((data: any) => {
      this.collections = data;
      this.collectionsParents = this.collections.filter(x => x.parentCollectionId === null);
    });

    this.svc.getAllCategories().subscribe((data: any) => {
      this.categories = data;
    });


  }

  getProductDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const that = this;
    this.svc.getProductEditById(parseInt(id)).subscribe(data => {
      this.product = data;
      console.log(this.product);
      let firstImage = true;
      console.log('Slikeee', this.product.images);
      for (const value of this.product.images) {
        if (firstImage) {
          that.data.image = value.imageUrl;
          firstImage = false;
        }
        value.imageCrop = value.imageCropUrl;
        this.images.push(value);
      }
      that.data2.image = 'data:image/jpeg;base64,' + this.product.drawingImage;
      console.log(that.data,that.data2);
      const image2: any = new Image();
      image2.src = that.data2.image;
      this.cropper2.settings = this.cropperSettings;
      this.cropper2.setImage(image2);
      console.log('this.images = ', this.images);
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
    for (const image of this.images) {
      image.index = index;
      image.isDirty = true;
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
    console.log('change');
    const image: any = new Image();
    const file: File = $event.target.files[0];
    this.fileType = file.name;
    this.fileType = this.fileType.slice(-4);
    const myReader: FileReader = new FileReader();
    const that = this;

    myReader.onloadend = function(loadEvent: any) {

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
    myReader.onloadend = function(loadEvent: any) {
      image.src = loadEvent.target.result;
      that.originalImg = image.src;
      that.cropper2.setImage(image);
      that.setImageDrawing = true;
    };

    myReader.readAsDataURL(file);
  }

  cropped(event: any) {
    const image = this.images.find(x => x.index == this.activeImageIndex);
    if (image) {
      image.imageCrop = this.data.image;
      if (image.id > 0) {
        image.isDirty = true;
      }
    }

  }

  saveOnClick() {

    this.product.images = [];
    if (this.images.length > 0) {
      this.disableSave = true;
      this.blockAll = true;
      // let index = 0;
      // let indexFile = 0;
      if (!this.isEditMode) {
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
      }

      const imageString2 = this.data2.image.split('base64,');
      if (this.setImage) {
        this.product.drawingImage = imageString2[imageString2.length - 1];
        this.product.drawingImageExtension = this.fileType2;
        //  var imageStringOrig = this.originalImg.split('base64,');
        // this.collection.image = imageStringOrig[imageStringOrig.length - 1];
      }

      if (this.isEditMode) {
        console.log(this.product);
        console.log(this.images);
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
        console.log('Lidllll', this.product);
        this.svc.updateProduct(this.product)
          .finally(() => { this.isLoading = false; })
          .subscribe((response: any) => {
            this.blockAll = false;
            //this.handleResponse(response);
            this.router.navigate(['/admin/product']);
          });
      } else {
        this.svc.createProduct(this.product)
          .finally(() => { this.isLoading = false; })
          .subscribe((response: any) => {
            this.blockAll = false;
            //this.handleResponse(response);
            this.router.navigate(['/admin/product']);
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

      console.log(response);
      const body = JSON.parse(response._body);
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

  uploadImage2() {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      this.fileInput2.nativeElement, 'dispatchEvent', [event]);
  }

  removeImage2() {
    this.data2 = {};
    this.cropper2.reset();
  }

  getCollectionsById(id: number) {
    if (this.collections.length > 0 && id > 0) {
      return this.collections.filter((x: any) => x.parentCollectionId === id);
    } else {
      return [];
    }
  }


}

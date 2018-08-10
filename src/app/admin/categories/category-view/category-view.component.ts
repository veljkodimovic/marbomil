import { NgModule, Component, Input, Output, EventEmitter, Renderer, ElementRef, forwardRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { NotificationsService } from 'angular2-notifications';
import { Category } from '@app/core/types/category';
import { CategoryService } from '@app/admin/categories/categories.service';
import { DeleteModalComponent } from '@app/shared/delete-modal/delete-modal';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.scss']
})
export class CategoryViewComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild(DeleteModalComponent)
  private modal: DeleteModalComponent;
  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;
  cropperSettings: CropperSettings;
  image: any;
  data: any;
  category: Category = new Category(0, '', '', '', '', '', '');
  categories: any[] = [];
  isLoading: boolean;
  setImage: boolean = false;
  originalImg: string = '';
  isEditMode: boolean = true;
  disableSave: boolean = false;
  blockAll: boolean = false;

  constructor(private svc: CategoryService,
              private renderer: Renderer,
              private notificationService: NotificationsService,
              private router: Router,
              private route: ActivatedRoute) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 400;
    this.cropperSettings.height = 270;
    this.cropperSettings.croppedWidth = 400;
    this.cropperSettings.croppedHeight = 270;
    this.cropperSettings.canvasWidth = 460;
    this.cropperSettings.canvasHeight = 259;
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
      this.getCategoryDetails();
    }

    this.svc.getAllCategories().subscribe((data: any) => {
      this.categories = data;
      this.categories.splice(this.categories.indexOf(this.category.title), 1);
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


  getCategoryDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.svc.getCategoryById(parseInt(id)).subscribe(data => {
      this.category = data;
      const image: any = new Image();
      image.src = 'data:image/jpeg;base64,' + this.category.image;
      this.cropper.settings = this.cropperSettings;
      this.cropper.setImage(image);
    });
  }

  saveOnClick() {
    console.log(this.data);
    if (this.data.image) {

      this.disableSave = true;
      this.blockAll = true;

      const imageString = this.data.image.split('base64,');
      if (this.setImage) {
        this.category.imageCrop = imageString[imageString.length - 1];
        const imageStringOrig = this.originalImg.split('base64,');
        this.category.image = imageStringOrig[imageStringOrig.length - 1];
      }
      if (this.isEditMode) {
        this.svc.updateCategory(this.category)
          .finally(() => { this.isLoading = false; this.router.navigate(['/admin/category']); })
          .subscribe((response: any) => {
            this.blockAll = false;
            this.handleResponse(response);
          });
      }
      else {
        this.svc.createCategory(this.category)
          .finally(() => { this.isLoading = false; this.router.navigate(['/admin/category']); })
          .subscribe((response: any) => {
            this.blockAll = false;
            this.handleResponse(response);
            const id = +response._body;
            this.category.id = id;

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

  handleResponse(response: any) {
    this.disableSave = false;
    if (!response.ok) {
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
      this.notificationService.success('Success', 'Category saved successfully.',
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
    this.svc.deleteCategory(this.category.id).subscribe(res => {
      this.router.navigate(['/admin/category/']);
    });
  }

}

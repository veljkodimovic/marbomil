import { Component, Renderer, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { NotificationsService } from 'angular2-notifications';
import { Category } from '@app/core/types/category';
import { CategoryService } from '@app/admin/categories/categories.service';
import { DeleteModalComponent } from '@app/shared/delete-modal/delete-modal';
import { PersistenceService } from '@app/core/persistence.service';

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
  category: Category = new Category(0, '', null, '', '', '', '', '.jpg');
  categories: any[] = [];
  isLoading: boolean;
  setImage = false;
  originalImg = '';
  isEditMode = true;
  disableSave = false;
  blockAll = false;
  fileType: string;

  constructor(private svc: CategoryService,
    private renderer: Renderer,
    private notificationService: NotificationsService,
    private persistenceService: PersistenceService,
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
    this.isLoading = true;
    if (this.router.url.indexOf('new') !== -1) {
      this.isEditMode = false;
      setTimeout(() => {
        this.isLoading = false;
      }, 300);
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


  getCategoryDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const that = this;
    this.svc.getCategoryEditById(Number(id)).subscribe(data => {
      this.category = data;
      that.data.image = 'data:image/jpeg;base64,' + this.category.image;
      const image: any = new Image();
      image.src = 'data:image/jpeg;base64,' + this.category.image;
      this.cropper.settings = this.cropperSettings;
      this.cropper.setImage(image);
      this.isLoading = false;
    });
  }

  saveOnClick() {
    this.disableSave = true;
    this.blockAll = true;
    let noChanges = true;
    this.isLoading = true;
    if (!this.data.image) {
      noChanges = false;
      this.category.image = this.persistenceService.placeholderImage;
      this.category.imageCrop = this.persistenceService.placeholderImage;
      this.category.imageExtension = this.persistenceService.placeholderExtension;
    } else {
      const imageString = this.data.image.split('base64,');
      if (this.setImage) {
        this.category.imageCrop = imageString[imageString.length - 1];
        const imageStringOrig = this.originalImg.split('base64,');
        this.category.image = imageStringOrig[imageStringOrig.length - 1];
        this.category.imageExtension = this.fileType;
      }
    }
    if (this.isEditMode) {
      if (!this.setImage && noChanges) {
        this.category.image = null;
        this.category.imageCrop = null;
      }
      this.svc.updateCategory(this.category)
        .finally(() => { this.isLoading = false; })
        .subscribe((response: any) => {
          this.blockAll = false;
          this.handleResponse(response);
        });
    } else {
      this.svc.createCategory(this.category)
        .finally(() => { this.isLoading = false; })
        .subscribe((response: any) => {
          this.blockAll = false;
          this.handleResponse(response);
          const id = +response._body;
          this.category.id = id;
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
      this.notificationService.success('Success', 'Kategorija je uspešno sačuvana.',
        {
          timeOut: 1000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: false,
          maxLength: 100
        });
      setTimeout(() => {
        this.router.navigate(['/admin/category']);
      }, 1000);
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

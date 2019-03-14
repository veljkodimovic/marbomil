import { Component, Renderer, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BannerService } from '../banner.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Banner } from '@app/core/types/banner';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { NotificationsService } from 'angular2-notifications';
import { PersistenceService } from '@app/core/persistence.service';
import { DeleteModalComponent } from '@app/shared/delete-modal/delete-modal';
import { environment } from '@env/environment';

@Component({
  selector: 'app-banner-view',
  templateUrl: './banner-view.component.html',
  styleUrls: ['./banner-view.component.scss']
})
export class BannerViewComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;
  @ViewChild(DeleteModalComponent)
  private modal: DeleteModalComponent;
  cropperSettings: CropperSettings;
  image: any;
  data: any;
  banner: Banner = new Banner(0, '', '', '', '', '', '', '.jpg');
  isLoading: boolean;
  setImage = false;
  originalImg = '';
  isEditMode = true;
  disableSave = false;
  blockAll = false;
  fileType: string;

  constructor(private svc: BannerService,
    private renderer: Renderer,
    private notificationService: NotificationsService,
    private persistenceService: PersistenceService,
    private router: Router,
    private route: ActivatedRoute) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 1920;
    this.cropperSettings.height = 679;
    this.cropperSettings.croppedWidth = 1920;
    this.cropperSettings.croppedHeight = 679;
    this.cropperSettings.canvasWidth = 460;
    this.cropperSettings.canvasHeight = 162;
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.keepAspect = true;
    this.cropperSettings.preserveSize = true;
    this.data = {};
  }

  ngOnInit() {
    if (this.router.url.indexOf('new') !== -1) {
      this.isEditMode = false;
    } else {
      this.isEditMode = true;
      this.getBannerDetails();
    }

  }

  fileChangeListener($event: any) {
    const image: any = new Image();
    const file: File = $event.target.files[0];
    this.fileType = file.name;
    this.fileType = this.fileType.slice(-4);
    const myReader: FileReader = new FileReader();
    const that = this;
    myReader.onloadend = function(loadEvent: any) {
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

  openModal() {
    this.modal.openModal();
  }

  performDelete(event: any) {
    this.svc.deleteBanner(this.banner.id).subscribe(res => {
      this.router.navigate(['/admin/banner/']);
    });
  }


  getBannerDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const that = this;
    this.svc.getBannerEditById(Number(id)).subscribe(data => {
      this.banner = data;
      that.data.image = 'data:image/jpeg;base64,' + this.banner.image;
      const image: any = new Image();
      const imageCrop: any = new Image();
      image.src = 'data:image/jpeg;base64,' + this.banner.image;
      imageCrop.src = 'data:image/jpeg;base64,' + this.banner.imageCrop;
      this.cropper.settings = this.cropperSettings;
      this.cropper.setImage(imageCrop);
    });
  }

  saveOnClick() {
    this.disableSave = true;
    this.blockAll = true;
    let noChanges = true;

    if (!this.data.image) {
      noChanges = false;
      this.banner.image = this.persistenceService.placeholderImage;
      this.banner.imageCrop = this.persistenceService.placeholderImage;
      this.banner.imageExtension = this.persistenceService.placeholderExtension;
    } else {
      const imageString = this.data.image.split('base64,');
      if (this.setImage) {
        this.banner.imageCrop = imageString[imageString.length - 1];
        const imageStringOrig = this.originalImg.split('base64,');
        this.banner.image = imageStringOrig[imageStringOrig.length - 1];
        this.banner.imageExtension = this.fileType;
      }
    }
    if (this.isEditMode) {
      if (!this.setImage && noChanges) {
        this.banner.image = null;
        this.banner.imageCrop = null;
      }
      this.svc.updateBanner(this.banner)
        .finally(() => { this.isLoading = false; })
        .subscribe((response: any) => {
          this.blockAll = false;
          this.handleResponse(response);
        });
    } else {
      this.svc.createBanner(this.banner)
        .finally(() => { this.isLoading = false;  })
        .subscribe((response: any) => {
          this.blockAll = false;
          this.handleResponse(response);
          const id = +response._body;
          this.banner.id = id;
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
      this.notificationService.success('Success', 'Baner je uspešno sačuvan.',
        {
          timeOut: 1000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: false,
          maxLength: 100
        });
      setTimeout(() => {
        this.router.navigate(['/admin/banners']);
      }, 1000);
      this.isEditMode = true;
    }
  }

}

import { NgModule, Component, Input, Output, EventEmitter, Renderer, ElementRef, forwardRef, OnInit, ViewChild } from '@angular/core';
import { BannerService } from '../banner.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Banner } from '../../../core/types/banner';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-banner-view',
  templateUrl: './banner-view.component.html',
  styleUrls: ['./banner-view.component.scss']
})
export class BannerViewComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;
  cropperSettings: CropperSettings;
  image: any;
  data: any;
  banner: Banner = new Banner(0, "", "", "", "", "", "");
  link: any;
  isLoading: boolean;
  setImage: boolean = false;
  originalImg: string = '';
  isEditMode: boolean = true;
  disableSave: boolean = false;
  blockAll: boolean = false;

  constructor(private svc: BannerService,
    private renderer: Renderer,
    private notificationService: NotificationsService,
    private router: Router,
    private route: ActivatedRoute) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 1920;
    this.cropperSettings.height = 300;
    this.cropperSettings.croppedWidth = 1920;
    this.cropperSettings.croppedHeight = 300;
    this.cropperSettings.canvasWidth = 1124;
    this.cropperSettings.canvasHeight = 176;
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
      this.getBannerDetails();
    }

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


  getBannerDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.svc.getBannerById(parseInt(id)).subscribe(data => {
      this.banner = data;
      var image: any = new Image();
      image.src = 'data:image/jpeg;base64,' + this.banner.image;
      this.cropper.settings = this.cropperSettings;
      this.cropper.setImage(image);
    });
  }

  saveOnClick() {
    if (this.data.image) {

      this.disableSave = true;
      this.blockAll = true;

      var imageString = this.data.image.split('base64,');
      if (this.setImage) {
        this.banner.imageCrop = imageString[imageString.length - 1];
        var imageStringOrig = this.originalImg.split('base64,');
        this.banner.image = imageStringOrig[imageStringOrig.length - 1];
      }
      if (this.isEditMode) {

        this.svc.updateBanner(this.banner)
          .finally(() => { this.isLoading = false; this.router.navigate(['/admin/banners']); })
          .subscribe((response: any) => {
            this.blockAll = false;
            this.handleResponse(response);
          });
      }
      else {
        this.svc.createBanner(this.banner)
          .finally(() => { this.isLoading = false; this.router.navigate(['/admin/banners']); })
          .subscribe((response: any) => {
            this.blockAll = false;
            this.handleResponse(response);
            var id = +response._body;
            this.banner.id = id;

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


}

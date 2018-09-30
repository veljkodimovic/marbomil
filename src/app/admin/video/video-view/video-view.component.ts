import { NgModule, Component, Input, Output, EventEmitter, Renderer, ElementRef, forwardRef, OnInit, ViewChild } from '@angular/core';
import { VideoService } from '@app/admin/video/video.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Video } from '@app/core/types/video';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { NotificationsService } from 'angular2-notifications';
import { DomSanitizer } from '@angular/platform-browser';
import { DeleteModalComponent } from '@app/shared/delete-modal/delete-modal';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.scss']
})
export class VideoViewComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild(DeleteModalComponent)
  private modal: DeleteModalComponent;
  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;
  cropperSettings: CropperSettings;
  image: any;
  data: any;
  video: Video = new Video(0, '', '', '', '', '', '', '');
  videoUrl: any;
  link: any;
  isLoading: boolean;
  setImage: boolean = false;
  originalImg: string = '';
  isEditMode: boolean = true;
  disableSave: boolean = false;
  blockAll: boolean = false;
  fileType: string;

  constructor(private svc: VideoService,
              private renderer: Renderer,
              private notificationService: NotificationsService,
              private router: Router,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 400;
    this.cropperSettings.height = 300;
    this.cropperSettings.croppedWidth = 400;
    this.cropperSettings.croppedHeight = 300;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 400;
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
      this.getVideoDetails();
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


  getVideoDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.svc.getVideoById(parseInt(id)).subscribe(data => {
      this.video = data;
      const image: any = new Image();
      image.src = this.video.imageUrl;
      this.cropper.settings = this.cropperSettings;
      this.cropper.setImage(image);
      this.videoUrl = 'https://www.youtube.com/embed/' + this.video.url;
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
    });
  }

  saveOnClick() {
    if (this.data.image) {

      this.disableSave = true;
      this.blockAll = true;

      const imageString = this.data.image.split('base64,');
      if (this.setImage) {
        this.video.imageCrop = imageString[imageString.length - 1];
        const imageStringOrig = this.originalImg.split('base64,');
        this.video.image = imageStringOrig[imageStringOrig.length - 1];
        this.video.imageExtension = this.fileType;
      }

      if (this.isEditMode) {

        this.svc.updateVideo(this.video)
          .finally(() => { this.isLoading = false; this.router.navigate(['/admin/video']); })
          .subscribe((response: any) => {
            this.blockAll = false;
            this.handleResponse(response);
          });
      }
      else {
        this.svc.createVideo(this.video)
          .finally(() => { this.isLoading = false; this.router.navigate(['/admin/video']); })
          .subscribe((response: any) => {
            this.blockAll = false;
            this.handleResponse(response);
            var id = +response._body;
            this.video.id = id;
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
    } else {
      this.notificationService.success('Success', 'Video saved successfully.',
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
    this.svc.deleteVideo(this.video.id).subscribe(res => {
      this.router.navigate(['/admin/video/']);
    });
  }

}

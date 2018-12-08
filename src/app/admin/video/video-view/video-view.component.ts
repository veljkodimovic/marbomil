import { NgModule, Component, Input, Output, EventEmitter, Renderer, ElementRef, forwardRef, OnInit, ViewChild } from '@angular/core';
import { VideoService } from '@app/admin/video/video.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Video } from '@app/core/types/video';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { NotificationsService } from 'angular2-notifications';
import { DomSanitizer } from '@angular/platform-browser';
import { DeleteModalComponent } from '@app/shared/delete-modal/delete-modal';
import { PersistenceService } from '@app/core/persistence.service';

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
              private persistenceService: PersistenceService,
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
    } else {
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

  updateEmbededVideo() {
    this.videoUrl = 'https://www.youtube.com/embed/' + this.video.url;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
  }

  getVideoDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const that = this;
    this.svc.getVideoEditById(parseInt(id)).subscribe(data => {
      this.video = data;
      that.data.image = 'data:image/jpeg;base64,' + this.video.image;
      const image: any = new Image();
      const imageCrop: any = new Image();
      image.src = 'data:image/jpeg;base64,' + this.video.image;
      imageCrop.src = 'data:image/jpeg;base64,' + this.video.imageCrop;
      this.cropper.settings = this.cropperSettings;
      this.cropper.setImage(imageCrop);
      this.videoUrl = 'https://www.youtube.com/embed/' + this.video.url;
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
    });
  }

  saveOnClick() {
    this.disableSave = true;
    this.blockAll = true;
    let noChanges = true;

    if (!this.data.image) {
      noChanges = false;
      this.video.image = this.persistenceService.placeholderImage;
      this.video.imageCrop = this.persistenceService.placeholderImage;
      this.video.imageExtension = this.persistenceService.placeholderExtension;
    } else {
      const imageString = this.data.image.split('base64,');
      if (this.setImage) {
        this.video.imageCrop = imageString[imageString.length - 1];
        const imageStringOrig = this.originalImg.split('base64,');
        this.video.image = imageStringOrig[imageStringOrig.length - 1];
        this.video.imageExtension = this.fileType;
      }
    }

    if (this.isEditMode) {
      if (!this.setImage && noChanges) {
        this.video.image = null;
        this.video.imageCrop = null;
      }
      this.svc.updateVideo(this.video)
        .finally(() => { this.isLoading = false; })
        .subscribe((response: any) => {
          this.blockAll = false;
          this.handleResponse(response);
        });
    } else {
      this.svc.createVideo(this.video)
        .finally(() => { this.isLoading = false; })
        .subscribe((response: any) => {
          this.blockAll = false;
          this.handleResponse(response);
          const id = +response._body;
          this.video.id = id;
        });
    }
  }

  handleResponse(response: any) {
    this.disableSave = false;
    if (!response.ok) {
      const body = JSON.parse(response._body)
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
      this.notificationService.success('Success', 'Video je uspešno sačuvan.',
        {
          timeOut: 1000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: false,
          maxLength: 100
        });
      setTimeout(() => {
        this.router.navigate(['/admin/video']);
      }, 1000);
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

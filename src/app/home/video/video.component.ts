import { Component, OnInit } from '@angular/core';
import { Banner } from '@app/core/types/banner';
import { Video } from '@app/core/types/video';
import { VideoService } from '@app/home/video/video.service';
import { PersistenceService } from '@app/core/persistence.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  banner: Banner;
  private apiUrl: string;
  videoData: Video[];
  constructor(private svc: VideoService,
    private persistenceService: PersistenceService,
              private sanitizer: DomSanitizer) {
                this.apiUrl = persistenceService.apiUrl;
              }

  ngOnInit() {
    this.svc.getBannerById(4).subscribe(data => {
      this.banner = data;
    });
    this.svc.getAllVideos().subscribe(data => {
      this.videoData = data;
      const sanitizer = this.sanitizer;
      this.videoData.forEach(function (video: Video) {
        video.url = 'https://www.youtube.com/embed/' + video.url;
        video.url = sanitizer.bypassSecurityTrustResourceUrl(video.url);
      });
    });
  }

}

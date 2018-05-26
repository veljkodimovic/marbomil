import { Component, OnInit } from '@angular/core';
import { VideoService} from '../video.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.scss']
})
export class VideoViewComponent implements OnInit {

   video: any;
   link: any;
  constructor(private svc: VideoService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getVideoDetails();
  }

  getVideoDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.svc.getVideoById(id).subscribe(data => {
      this.video = data.data;
    });
  }

}

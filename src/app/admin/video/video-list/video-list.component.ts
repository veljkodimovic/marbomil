import { Component, OnInit } from '@angular/core';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})

export class VideoListComponent implements OnInit {

  videoData: any;

  constructor(private svc: VideoService) {}

  ngOnInit() {
    this.svc.getVideo().subscribe(data => {
      this.videoData = data;
    });
  }

}

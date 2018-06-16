import { Component, OnInit } from '@angular/core';
import { VideoService } from '../video.service';
import { Router } from '@angular/router';
import { Video } from '@app/core/types/video';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {

  videoData: Video[];

  constructor(private svc: VideoService,
              private router: Router,
              private modalService: NgbModal) {}

  ngOnInit() {
    this.svc.getAllVideos().subscribe(data => {
      console.log(data);
      this.videoData = data;
    });
  }

  goTo(video: Video) {
    this.router.navigate(['/admin/video/' + video.id]);
  }

  deleteAction(video: Video) {
    this.svc.deleteVideo(video.id).subscribe(res => {
      console.log('Deleted');
      this.router.navigate(['/admin/video/']);
    });
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

}

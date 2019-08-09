import {Component, OnInit, ViewChild} from '@angular/core';
import { VideoService } from '../video.service';
import { Router } from '@angular/router';
import { Video } from '@app/core/types/video';
import { PersistenceService } from '@app/core/persistence.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from '@app/shared/delete-modal/delete-modal';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {
  @ViewChild(DeleteModalComponent)
  private modal: DeleteModalComponent;
  private apiUrl: string;
  videoData: Video[];

  activeVideo: Video;
  isLoading: boolean;

  constructor(private svc: VideoService,
    private persistenceService: PersistenceService,
    private router: Router,
    private modalService: NgbModal) {
      this.apiUrl = persistenceService.apiUrl;
    }

  ngOnInit() {
    this.isLoading = true;
    this.svc.getAllVideos().subscribe(data => {
      this.videoData = data;
      this.isLoading = false;
    });
  }

  goTo(video: Video) {
    this.router.navigate(['/admin/video/' + video.id]);
  }

  openModal(video: Video) {
    this.activeVideo = video;
    this.modal.openModal();
  }

  performDelete(event: any) {
    this.svc.deleteVideo(this.activeVideo.id).subscribe(res => {
      this.svc.getAllVideos().subscribe(data => {
        this.videoData = data;
      });
    });
  }

}

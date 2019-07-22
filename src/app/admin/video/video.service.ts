import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Video } from '@app/core/types/video';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { PersistenceService } from '../../core/persistence.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const routes = {
  video: () => `/video/`
};

@Injectable()
export class VideoService {

  activeVideo: Video;
  headers: Headers;
  options: any;
  constructor(private http: Http, private persistenceService: PersistenceService) {
    this.options = this.persistenceService.getApiHeader();
  }

  // Videos region
  getAllVideos(): Observable<any[]> {
    return this.http.get(routes.video())
      .map((res: Response) => res.json())
      .map(body =>
        body)
      .catch(err => this.persistenceService.handleError(err));
  }

  getVideoById(id: number): Observable<any> {

    return this.http.get(routes.video() + id)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch((err) => this.persistenceService.handleError(err));
  }

  getVideoEditById(id: number): Observable<any> {
    this.options = this.persistenceService.getApiHeader();
    return this.http.get(routes.video() + 'edit/' + id, this.options)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch((err) => this.persistenceService.handleError(err));
  }

  createVideo(body: Video): Observable<any> {
    // let bodyString = JSON.stringify(body);
    this.options = this.persistenceService.getApiHeader();
    return this.http.post(routes.video(), body, this.options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  updateVideo(body: Video): Observable<any> {
    // let bodyString = JSON.stringify(body);
    this.options = this.persistenceService.getApiHeader();
    return this.http.put(routes.video(), body, this.options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  deleteVideo(id: number): Observable<any> {
    this.options = this.persistenceService.getApiHeader();
    return this.http.delete(routes.video() + id, this.options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  // end of video

}

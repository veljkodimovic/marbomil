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

const credentialsKey = 'credentials';
const storageLocal = JSON.parse(localStorage.getItem(credentialsKey));
const storageSession = JSON.parse(sessionStorage.getItem(credentialsKey));
let accessToken = '';
if (storageSession) {
  accessToken = storageSession.accessToken;
} else if (storageLocal) {
  accessToken = storageLocal.accessToken;
}
const headers = new Headers({
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + accessToken
});
const options = new RequestOptions({ headers: headers });

@Injectable()
export class VideoService {

  activeVideo: Video;
  headers: Headers;
  constructor(private http: Http, private persistenceService: PersistenceService) {

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

    return this.http.get(routes.video() + 'edit/' + id, options)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch((err) => this.persistenceService.handleError(err));
  }

  createVideo(body: Video): Observable<any> {
    // let bodyString = JSON.stringify(body);

    return this.http.post(routes.video(), body, options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  updateVideo(body: Video): Observable<any> {
    // let bodyString = JSON.stringify(body);

    return this.http.put(routes.video(), body, options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  deleteVideo(id: number): Observable<any> {

    return this.http.delete(routes.video() + id, options)
      .map((res: Response) => res)
      .catch((res: Response) => this.persistenceService.handleError(res));
  }

  // end of video

}

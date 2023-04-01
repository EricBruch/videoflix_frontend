import { Injectable } from '@angular/core';
import { BehaviorSubject, first, tap } from 'rxjs';
import { VideoListControllerService } from 'src/app/core/videos-controller.service';
import { Video } from 'src/app/shared';

@Injectable({
  providedIn: 'root',
})
export class VideoListFacade {
  private _videoList$ = new BehaviorSubject<Video[]>([]);
  videoList$ = this._videoList$.asObservable();

  constructor(private controller: VideoListControllerService) {}

  loadVideos() {
    this.controller
      .getVideos()
      .pipe(
        tap((videoList) => this._videoList$.next(videoList)),
        first()
      )
      .subscribe();
  }
}

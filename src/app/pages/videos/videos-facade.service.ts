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

  private _video$ = new BehaviorSubject<Video | null>(null);
  video$ = this._video$.asObservable();

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

  loadVideo(id: number) {
    this.controller
      .getVideo(id)
      .pipe(
        tap((video) => this._video$.next(video)),
        first()
      )
      .subscribe();
  }
}

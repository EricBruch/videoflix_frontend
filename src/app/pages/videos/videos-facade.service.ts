import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, first, map, Observable, tap } from 'rxjs';
import { VideoListControllerService } from 'src/app/core/videos-controller.service';
import { Encoding, EncodingUrls, Video } from 'src/app/shared';

const removeLastNChars = (str: string, num: number) => str.slice(0, -num);

const fEnding = '.mp4';

const mapPathToEncoding = (path: string, encoding: Encoding) => {
  const cutOff = removeLastNChars(path, 4);
  switch (encoding) {
    case '1080P':
      return `${cutOff}_360p${fEnding}`;

    case '720P':
      return `${cutOff}_720p${fEnding}`;

    case '480P':
      return `${cutOff}_480p${fEnding}`;

    case '360P':
      return `${cutOff}_360p${fEnding}`;

    default:
      throw new Error('no valid selection used');
  }
};

@Injectable({
  providedIn: 'root',
})
export class VideoListFacade {
  private _videoList$ = new BehaviorSubject<Video[]>([]);
  videoList$ = this._videoList$.asObservable();

  private _video$ = new BehaviorSubject<Video | null>(null);
  video$ = this._video$.asObservable();

  videoUrls$: Observable<EncodingUrls> = this._video$.asObservable().pipe(
    filter((v) => !!v),
    map((v) => v!.video_file),
    map((url) => ({
      ORIGINAL: url,
      '1080P': mapPathToEncoding(url, '1080P'),
      '720P': mapPathToEncoding(url, '720P'),
      '480P': mapPathToEncoding(url, '480P'),
      '360P': mapPathToEncoding(url, '360P'),
    }))
  );

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

  resetVideo() {
    this._video$.next(null);
  }
}

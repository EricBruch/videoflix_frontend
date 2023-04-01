import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Video } from '../shared';
import { baseUrl } from './common';

@Injectable({
  providedIn: 'root',
})
export class VideoListControllerService {
  constructor(private http: HttpClient) {}

  getVideos = () => this.http.get<Video[]>(`${baseUrl}/videos/`);
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListePresentationComponent } from './liste-presentation.component';
import { VideoListFacade } from '../videos-facade.service';

@Component({
  selector: 'app-liste',
  standalone: true,
  imports: [CommonModule, ListePresentationComponent],
  template: `<app-liste-presentation
    [videoList]="facade.videoList$ | async"
  ></app-liste-presentation>`,
})
export class ListeComponent implements OnInit {
  constructor(public facade: VideoListFacade) {}

  ngOnInit(): void {
    this.facade.loadVideos();
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsPresentationComponent } from './details-presentation.component';
import { VideoListFacade } from '../videos-facade.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, DetailsPresentationComponent],
  template: `<app-details-presentation
    [video]="facade.video$ | async"
  ></app-details-presentation>`,
})
export class DetailsComponent implements OnInit {
  constructor(
    public facade: VideoListFacade,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.facade.loadVideo(
      +(this.actRoute.snapshot.paramMap.get('id') as string)
    );
  }
}

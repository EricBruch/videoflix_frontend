import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsPresentationComponent } from './details-presentation.component';
import { VideoListFacade } from '../videos-facade.service';
import { ActivatedRoute } from '@angular/router';
import { first, tap } from 'rxjs';
import { Encoding, EncodingUrls } from 'src/app/shared';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, DetailsPresentationComponent],
  template: `<app-details-presentation
    [video]="facade.video$ | async"
    [currentUrl]="currentUrl"
    (encodingSelected)="onEncodingSelected($event)"
  ></app-details-presentation>`,
})
export class PageComponent implements OnInit {
  currentUrl = '';

  facade = inject(VideoListFacade);
  private actRoute = inject(ActivatedRoute);

  private videoUrls!: EncodingUrls;

  ngOnInit(): void {
    this.facade.resetVideo();

    this.facade.loadVideo(
      +(this.actRoute.snapshot.paramMap.get('id') as string)
    );

    this.facade.videoUrls$
      .pipe(
        first(),
        tap((urls) => (this.videoUrls = urls)),
        tap((urls) => (this.currentUrl = urls['ORIGINAL']))
      )
      .subscribe();
  }

  onEncodingSelected(encoding: Encoding) {
    this.currentUrl = this.videoUrls[encoding];
  }
}

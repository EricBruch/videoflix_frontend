import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BtnRouterlinkComponent,
  Encoding,
  InputSelectNativeComponent,
  Video,
} from 'src/app/shared';
import { FormsModule } from '@angular/forms';
import { VideoPresentationComponent } from './video-presentation.component';

interface EncodingSelection {
  value: Encoding;
  viewValue: string;
}

@Component({
  selector: 'app-details-presentation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputSelectNativeComponent,
    VideoPresentationComponent,
    BtnRouterlinkComponent,
  ],
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <div *ngIf="video as v" class="container border rounded py-3">
      <div class="row mb-2">
        <div class="col">
          <app-btn-routerlink
            link="/videos"
            class=""
            txt="back to videos"
          ></app-btn-routerlink>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div><b>Title:</b></div>
          <div>{{ v.title }} - {{ v.created_at | date }}</div>
          <app-input-select-native
            label="Select video encoding for low bandwidth"
            ngDefaultControl
            [valueList]="encodings"
            [hasUnselectOption]="false"
            [ngModel]="currentEncoding"
            (ngModelChange)="encodingSelected.emit($event)"
          ></app-input-select-native>
          <div></div>
        </div>
        <div class="col">
          <div><b>Description:</b></div>
          <div>{{ v.description }}</div>
        </div>
      </div>
      <div *ngIf="currentUrl" class="row">
        <app-video-presentation
          class="d-flex justify-content-center"
          [url]="currentUrl"
        ></app-video-presentation>
      </div>
    </div>
  `,
})
export class DetailsPresentationComponent {
  @Input() video: Video | null = null;

  @Input() currentUrl = '';

  @Output() encodingSelected = new EventEmitter<Encoding>();

  encodings: EncodingSelection[] = [
    { value: 'ORIGINAL', viewValue: 'Original' },
    { value: '360P', viewValue: '360p' },
    { value: '480P', viewValue: '480p' },
    { value: '720P', viewValue: '720p' },
    { value: '1080P', viewValue: '1080p' },
  ];

  currentEncoding = 'ORIGINAL';
}

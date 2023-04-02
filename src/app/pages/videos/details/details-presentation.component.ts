import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputSelectNativeComponent, Video } from 'src/app/shared';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details-presentation',
  standalone: true,
  imports: [CommonModule, FormsModule, InputSelectNativeComponent],
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <div *ngIf="video as v" class="container border rounded py-3">
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
            (ngModelChange)="selectionChange($event)"
          ></app-input-select-native>
          <div></div>
        </div>
        <div class="col">
          <div><b>Description:</b></div>
          <div>{{ v.description }}</div>
        </div>
      </div>
      <div class="row">
        <video
          width="800px"
          height="800px"
          controls
          [src]="v.video_file"
        ></video>
      </div>
    </div>
  `,
})
export class DetailsPresentationComponent {
  @Input() video: Video | null = null;

  selectionChange(value: any) {
    console.log(value);
  }

  encodings = [
    { value: 'original', viewValue: 'Original' },
    { value: '320', viewValue: '320p' },
  ];

  currentEncoding = 'original';
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Video } from 'src/app/shared';

@Component({
  selector: 'app-details-presentation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="video as v" class="container border rounded py-3">
      <div class="row">
        <div class="col">
          <div><b>Title:</b></div>
          <div>{{ v.title }} - {{ v.created_at | date }}</div>
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
}

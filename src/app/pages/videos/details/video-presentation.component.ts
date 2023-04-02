import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-presentation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <video
      *ngIf="url"
      width="800px"
      height="800px"
      controls
      [src]="url"
    ></video>
  `,
})
export class VideoPresentationComponent {
  @Input() url: string = '';
}

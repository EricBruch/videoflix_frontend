import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsPresentationComponent } from './details-presentation.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, DetailsPresentationComponent],
  template: `<app-details-presentation></app-details-presentation>`,
})
export class DetailsComponent {}

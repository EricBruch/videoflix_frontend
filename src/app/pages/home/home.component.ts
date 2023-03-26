import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomePresentationComponent } from './home-presentation/home-presentation.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HomePresentationComponent],
  changeDetection: ChangeDetectionStrategy.Default,
  template: ` <app-home-presentation></app-home-presentation>`,
})
export class HomeComponent {}

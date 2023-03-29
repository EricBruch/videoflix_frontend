import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserFacade } from 'src/app/core';
import { TopbarPresentationComponent } from './topbar-presentation.component';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, TopbarPresentationComponent],
  changeDetection: ChangeDetectionStrategy.Default,
  template: `<app-topbar-presentation
    [isAuthenticated]="userFacade.isAuthenticated$ | async"
  ></app-topbar-presentation>`,
})
export class TopbarComponent {
  constructor(public userFacade: UserFacade) {}
}

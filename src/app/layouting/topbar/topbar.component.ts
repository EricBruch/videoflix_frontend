import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserFacade } from 'src/app/core';
import { TopbarPresentationComponent } from './topbar-presentation.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, TopbarPresentationComponent],
  changeDetection: ChangeDetectionStrategy.Default,
  template: `<app-topbar-presentation
    [isAuthenticated]="facade.isAuthenticated$ | async"
    (logout)="onLogout()"
  ></app-topbar-presentation>`,
})
export class TopbarComponent {
  facade = inject(UserFacade);

  private router = inject(Router);

  onLogout() {
    this.facade.logout();
    this.router.navigateByUrl('/');
  }
}

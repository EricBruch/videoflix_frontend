import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFacade } from 'src/app/core';
import { BtnRouterlinkComponent } from 'src/app/shared';

@Component({
  selector: 'app-home-presentation',
  standalone: true,
  imports: [CommonModule, BtnRouterlinkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <p class="text-center">Welcome to videoflix startpage</p>
      <div
        *ngIf="isAuthenticated$ | async"
        class="d-flex justify-content-center"
      >
        <app-btn-routerlink link="/videos" txt="to videos"></app-btn-routerlink>
      </div>
    </div>
  `,
})
export class HomePresentationComponent {
  isAuthenticated$ = inject(UserFacade).isAuthenticated$;
}

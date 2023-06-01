import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { BtnRouterlinkComponent, BtnSimpleComponent } from 'src/app/shared';

@Component({
  selector: 'app-topbar-presentation',
  standalone: true,
  imports: [
    CommonModule,
    BtnRouterlinkComponent,
    RouterModule,
    MatToolbarModule,
    BtnSimpleComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-toolbar class="mt-2" color="primary">
      <mat-toolbar-row>
        <div class="container">
          <div class="row">
            <div class="col-2">
              <span routerLink="home" class="cursor-pointer icon-size-xxl">
                <i class="bi bi-person-video3"></i> Videoflix
              </span>
            </div>
            <div class="col-6">
              <div
                *ngIf="isAuthenticated; else notAuthenticated"
                class="d-flex justify-content-around"
              >
                <div>Welcome to videoflix</div>
                <app-btn-simple
                  (clicked)="logout.emit()"
                  txt="logout"
                ></app-btn-simple>
              </div>
            </div>
            <div class="col-4">
              <app-btn-routerlink
                link="/impressum"
                class="me-2"
                txt="impressum"
              ></app-btn-routerlink>
              <app-btn-routerlink
                link="/data-privacy"
                class="me-2"
                txt="data disclamer"
              ></app-btn-routerlink>
            </div>
          </div>
        </div>
      </mat-toolbar-row>
    </mat-toolbar>

    <ng-template #notAuthenticated>
      <div class="d-flex justify-content-end">
        <app-btn-routerlink link="/login" txt="Login"></app-btn-routerlink>
        <app-btn-routerlink
          link="/register"
          txt="Sign Up"
          class="mx-2"
        ></app-btn-routerlink>
        <app-btn-routerlink
          link="/password"
          txt="Forgot Password"
        ></app-btn-routerlink>
      </div>
    </ng-template>
  `,
})
export class TopbarPresentationComponent {
  @Input() isAuthenticated: null | boolean = null;

  @Output() logout = new EventEmitter();
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-topbar-presentation',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-toolbar class="mt-2" color="primary">
      <mat-toolbar-row>
        <div class="container">
          <div class="row">
            <div class="col">
              <span routerLink="home" class="cursor-pointer icon-size-xxl">
                <i class="bi bi-person-video3"></i> Videoflix
              </span>
            </div>
            <div class="col">
              <div class="d-flex justify-content-end">
                <button
                  routerLink="login"
                  mat-raised-button
                  color="primary"
                  class="me-2"
                >
                  login
                </button>

                <button routerLink="register" mat-raised-button>sign up</button>
              </div>
            </div>
          </div>
        </div>
      </mat-toolbar-row>
    </mat-toolbar>
  `,
})
export class TopbarPresentationComponent {}

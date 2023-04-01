import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Video } from 'src/app/shared';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-liste-presentation',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  template: `
    <div class="container">
      <div class="row">
        <div class="col">
          <h2>All Videos in overview</h2>
        </div>
      </div>
      <ng-container *ngIf="videoList">
        <div *ngFor="let v of videoList" class="row border rounded py-3">
          <div class="col-3">
            <div><b>Title:</b></div>
            <div>{{ v.title }} - {{ v.created_at | date }}</div>
          </div>
          <div class="col-9">
            <div><b>Description:</b></div>
            <div>{{ v.description }}</div>
          </div>
          <div class="col">
            <div>
              <a mat-raised-button [routerLink]="v.id.toString()" class="mt-2">
                to video
              </a>
            </div>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export class ListePresentationComponent {
  @Input() videoList: Video[] | null = null;
}

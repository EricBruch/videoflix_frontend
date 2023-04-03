import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-presentation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <p class="text-center">Welcome to videoflix startpage</p>
      <span routerLink="/videos"> Videos </span>
    </div>
  `,
})
export class HomePresentationComponent {}

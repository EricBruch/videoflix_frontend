import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-btn-routerlink',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a mat-raised-button [routerLink]="link" class="mt-2">
      {{ txt }}
    </a>
  `,
})
export class BtnRouterlinkComponent {
  @Input() link = '';

  @Input() txt = '';
}

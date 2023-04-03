import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-btn-simple',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      (click)="clicked.emit()"
      mat-raised-button
      [color]="color"
      [disabled]="isDisabled"
    >
      {{ txt }}
    </button>
  `,
})
export class BtnSimpleComponent {
  @Input() txt = '';

  @Input() color?: ThemePalette;

  @Input() isDisabled = false;

  @Output() clicked = new EventEmitter();
}

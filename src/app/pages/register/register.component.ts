import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPresentationComponent } from './register-presentation.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RegisterPresentationComponent],
  changeDetection: ChangeDetectionStrategy.Default,
  template: ` <app-register-presentation></app-register-presentation>`,
})
export class RegisterComponent {}

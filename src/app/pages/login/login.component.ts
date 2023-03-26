import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPresentationComponent } from './login-presentation.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, LoginPresentationComponent],
  changeDetection: ChangeDetectionStrategy.Default,
  template: `<app-login-presentation></app-login-presentation>`,
})
export class LoginComponent {}

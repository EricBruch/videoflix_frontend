import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginForm } from './login.component';
import { TextInputComponent } from 'src/app/shared';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login-presentation',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    TextInputComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<form [formGroup]="form" class="container mt-4">
    <div class="row">
      <div class="col">
        <h3>login to videoflix</h3>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <app-text-input
          formControlName="username"
          label="Username"
          placeholder="username..."
        ></app-text-input>
      </div>
      <div class="col">
        <app-text-input
          formControlName="password"
          label="Password"
          placeholder="password..."
        ></app-text-input>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button
          [disabled]="isLoginDisabled"
          mat-raised-button
          (click)="login.emit()"
        >
          login
        </button>
      </div>
    </div>
  </form>`,
})
export class LoginPresentationComponent {
  @Input() form!: LoginForm;

  @Input() isLoginDisabled = true;

  @Output() login = new EventEmitter<void>();
}

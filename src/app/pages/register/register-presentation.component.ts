import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterForm } from './register.component';
import { EmailInputComponent, TextInputComponent } from 'src/app/shared';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register-presentation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextInputComponent,
    EmailInputComponent,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <form [formGroup]="form" class="container mt-4">
    <div class="row">
      <div class="col">
        <h3>register a new account</h3>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <app-text-input
          formControlName="username"
          label="Username"
          placeholder="Choose your username"
        ></app-text-input>
      </div>
      <div class="col">
        <app-email-input
          formControlName="email"
          label="Email"
          placeholder="Choose your email"
        >
        </app-email-input>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <app-text-input
          formControlName="password1"
          label="Password"
          placeholder="my-password-1234..."
        ></app-text-input>
      </div>
      <div class="col">
        <app-text-input
          formControlName="password2"
          label="Repeat Password"
          placeholder="my-password-1234..."
        ></app-text-input>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button
          [disabled]="isSignUpDisabled"
          mat-raised-button
          (click)="signUp.emit()"
        >
          sign up
        </button>
      </div>
    </div>
  </form>`,
})
export class RegisterPresentationComponent {
  @Input() form!: RegisterForm;

  @Input() isSignUpDisabled = true;

  @Output() signUp = new EventEmitter<void>();
}

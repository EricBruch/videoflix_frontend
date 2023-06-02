import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterForm } from './page.component';
import { EmailInputComponent, TextInputComponent } from 'src/app/shared';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-register-presentation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
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
        <mat-form-field
          appearance="outline"
          floatLabel="always"
          class="mt-4 w-100"
        >
          <mat-label>Username</mat-label>
          <input
            matInput
            formControlName="username"
            placeholder="username..."
            type="text"
          />
        </mat-form-field>
      </div>
      <div class="col">
        <mat-form-field
          appearance="outline"
          floatLabel="always"
          class="mt-4 w-100"
        >
          <mat-label>Email</mat-label>
          <input
            matInput
            placeholder="Choose your email"
            type="email"
            formControlName="email"
          />
        </mat-form-field>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <mat-form-field
          appearance="outline"
          floatLabel="always"
          class="mt-4 w-100"
        >
          <mat-label>Password</mat-label>
          <input
            matInput
            formControlName="password1"
            placeholder="my-password-1234..."
            type="text"
          />
        </mat-form-field>
      </div>
      <div class="col">
        <mat-form-field
          appearance="outline"
          floatLabel="always"
          class="mt-4 w-100"
        >
          <mat-label>Repeat Password</mat-label>
          <input
            matInput
            formControlName="password2"
            placeholder="my-password-1234..."
            type="text"
          />
        </mat-form-field>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button mat-raised-button (click)="signUp.emit()">sign up</button>
      </div>
    </div>
  </form>`,
})
export class RegisterPresentationComponent {
  @Input() form!: RegisterForm;

  @Output() signUp = new EventEmitter<void>();
}

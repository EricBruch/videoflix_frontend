import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginForm } from './page.component';
import { TextInputComponent } from 'src/app/shared';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login-presentation',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
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
          <mat-label>Password</mat-label>
          <input
            matInput
            formControlName="password"
            placeholder="password..."
            type="text"
          />
        </mat-form-field>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button mat-raised-button (click)="login.emit()">login</button>
      </div>
    </div>
  </form>`,
})
export class LoginPresentationComponent {
  @Input() form!: LoginForm;

  @Input() isLoginDisabled = true;

  @Output() login = new EventEmitter<void>();
}

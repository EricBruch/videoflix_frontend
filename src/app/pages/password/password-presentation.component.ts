import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordForm } from './page.component';
import { BtnSimpleComponent, TextInputComponent } from 'src/app/shared';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-password-presentation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    TextInputComponent,
    BtnSimpleComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form [formGroup]="form" class="container mt-4">
      <div class="row">
        <div class="col">
          <h3>Request a password Change</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-9">
          <mat-form-field
            appearance="outline"
            floatLabel="always"
            class="mt-4 w-100"
          >
            <mat-label>Username</mat-label>
            <input
              matInput
              formControlName="usernameRequest"
              placeholder="John Doe..."
              type="text"
            />
          </mat-form-field>
        </div>
        <div class="col-3">
          <div class="h-100 d-flex align-items-center justify-content-center">
            <div>
              <app-btn-simple
                (clicked)="reset.emit()"
                txt="Request Password reset"
              ></app-btn-simple>
            </div>
          </div>
        </div>
      </div>
    </form>
    <form [formGroup]="confirmGroup" class="container mt-4">
      <div class="row">
        <div class="col">
          <h3>Confirm password reset</h3>
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
              formControlName="newPassword1"
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
              formControlName="newPassword2"
              placeholder="my-password-1234..."
              type="text"
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
            <mat-label>Repeat Password</mat-label>
            <input
              matInput
              formControlName="sharedSecret"
              placeholder="Enter Secret shared in eMail"
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
              formControlName="usernameConfirm"
              placeholder="John Doe..."
              type="text"
            />
          </mat-form-field>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <app-btn-simple
            (clicked)="(confirm.emit)"
            (clicked)="confirm.emit()"
            txt="Confirm Password reset"
          ></app-btn-simple>
        </div>
      </div>
    </form>
  `,
})
export class PasswordPresentationComponent {
  @Input() form!: PasswordForm;

  @Output() reset = new EventEmitter<void>();

  @Output() confirm = new EventEmitter<void>();

  get confirmGroup() {
    return this.form.controls.confirm;
  }
}

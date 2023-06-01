import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { PasswordForm } from './page.component';
import { BtnSimpleComponent, TextInputComponent } from 'src/app/shared';

@Component({
  selector: 'app-password-presentation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
          <app-text-input
            formControlName="usernameRequest"
            label="Username"
            placeholder="John Doe"
          ></app-text-input>
        </div>
        <div class="col-3">
          <div class="h-100 d-flex align-items-center justify-content-center">
            <div>
              <app-btn-simple
                (clicked)="reset.emit()"
                [isDisabled]="form.controls.usernameRequest.invalid"
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
          <app-text-input
            formControlName="newPassword1"
            label="Password"
            placeholder="my-password-1234..."
          ></app-text-input>
        </div>
        <div class="col">
          <app-text-input
            formControlName="newPassword2"
            label="Repeat Password"
            placeholder="my-password-1234..."
          ></app-text-input>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <app-text-input
            formControlName="sharedSecret"
            label="Enter Secret shared in eMail"
            placeholder="asdf1234"
          ></app-text-input>
        </div>
        <div class="col">
          <app-text-input
            formControlName="usernameConfirm"
            label="username"
            placeholder="John Doe"
          ></app-text-input>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <app-btn-simple
            (clicked)="(confirm.emit)"
            [isDisabled]="confirmGroup.invalid"
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

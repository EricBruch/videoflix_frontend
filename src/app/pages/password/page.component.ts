import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordPresentationComponent } from './password-presentation.component';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { minChars } from 'src/app/shared/validators';
import { PasswordFacade } from './password.facade';
import { Subscription, tap } from 'rxjs';
import { NotificationService } from 'src/app/core';
import { PasswordResetConfirm } from 'src/app/core/password-controller.service';

export type PasswordForm = FormGroup<{
  usernameRequest: FormControl<string | null>;
  confirm: ConfirmGroup;
}>;

type ConfirmGroup = FormGroup<{
  usernameConfirm: FormControl<string | null>;
  newPassword1: FormControl<string | null>;
  newPassword2: FormControl<string | null>;
  sharedSecret: FormControl<string | null>;
}>;

const matchPasswValidator: ValidatorFn = (
  a: AbstractControl
): ValidationErrors | null => {
  const form = a as ConfirmGroup;

  const pVal1 = form.controls.newPassword1.value;
  const pVal2 = form.controls.newPassword2.value;

  return !pVal1 || !pVal2 || pVal1 !== pVal2 ? { noValidPassword: true } : null;
};

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule, PasswordPresentationComponent],
  template: `<app-password-presentation
    [form]="form"
    (reset)="onReset()"
    (confirm)="onConfirm()"
  ></app-password-presentation>`,
})
export class PageComponent implements OnInit, OnDestroy {
  form: PasswordForm;

  private facade = inject(PasswordFacade);

  private notification = inject(NotificationService);

  private subs = new Subscription();

  constructor(fb: FormBuilder) {
    this.form = fb.nonNullable.group({
      usernameRequest: fb.control('', { validators: [...minChars(4)] }),
      confirm: fb.group(
        {
          usernameConfirm: fb.control('', { validators: [...minChars(4)] }),
          newPassword1: fb.control('', { validators: [...minChars(8)] }),
          newPassword2: fb.control('', { validators: [...minChars(8)] }),
          sharedSecret: fb.control('', { validators: [...minChars(10)] }),
        },
        { validators: matchPasswValidator }
      ),
    });
  }

  ngOnInit(): void {
    this.subs.add(
      this.facade.passwordResetSet$
        .pipe(
          tap(() =>
            this.notification.doNotification(
              'Reset Action performed. Check the emails of the user to know if it worked'
            )
          )
        )
        .subscribe()
    );

    this.facade.passwordConfirm$
      .pipe(
        tap(() =>
          this.notification.doNotification(
            'Confirm Action executed. Check your emails to know if it worked'
          )
        )
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onReset() {
    this.form.controls.usernameRequest.markAllAsTouched();
    this.form.controls.usernameRequest.updateValueAndValidity();

    if (this.form.controls.usernameRequest.valid) {
      this.facade.requestPasswordReset(
        this.form.getRawValue().usernameRequest!
      );
    }
  }

  onConfirm() {
    this.form.controls.confirm.markAllAsTouched();
    this.form.controls.confirm.updateValueAndValidity();

    if (this.form.controls.confirm.valid) {
      const values = this.form.controls.confirm.getRawValue();

      this.facade.requestPasswordConfirm({
        newPassword1: values.newPassword1!,
        newPassword2: values.newPassword2!,
        sharedSecret: values.sharedSecret!,
        username: values.usernameConfirm!,
      });
    }
  }
}

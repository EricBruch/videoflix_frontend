import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPresentationComponent } from './register-presentation.component';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RegisterFacade } from './register.facade';
import { first } from 'rxjs';
import { minChars } from 'src/app/shared/validators';
import { RegisterUser } from 'src/app/shared';
import { NotificationService } from 'src/app/core';

const matchPasswValidator: ValidatorFn = (
  a: AbstractControl
): ValidationErrors | null => {
  const form = a as RegisterForm;

  const pVal1 = form.controls.password1.value;
  const pVal2 = form.controls.password2.value;

  return !pVal1 || !pVal2 || pVal1 !== pVal2 ? { noValidPassword: true } : null;
};

export type RegisterForm = FormGroup<{
  username: FormControl<string | null>;
  email: FormControl<string | null>;
  password1: FormControl<string | null>;
  password2: FormControl<string | null>;
}>;

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RegisterPresentationComponent],
  changeDetection: ChangeDetectionStrategy.Default,
  template: ` <app-register-presentation
    [form]="form"
    (signUp)="onSignUp()"
  ></app-register-presentation>`,
})
export class PageComponent {
  form;

  constructor(
    fb: FormBuilder,
    private facade: RegisterFacade,
    private notification: NotificationService
  ) {
    this.form = fb.group(
      {
        username: fb.control('', {
          validators: [...minChars(4)],
        }),
        email: fb.control('', {
          validators: [...minChars(3), Validators.email],
        }),
        password1: fb.control(
          { value: '', disabled: false },
          { validators: [...minChars(8)] }
        ),
        password2: fb.control(
          { value: '', disabled: false },
          { validators: [...minChars(8)] }
        ),
      },
      { validators: matchPasswValidator }
    );
  }

  onSignUp() {
    this.form.markAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.valid) {
      this.facade
        .registerUser(this.form.getRawValue() as RegisterUser)
        .pipe(first())
        .subscribe({
          error: this.onError.bind(this),
        });
    }
  }

  private onError(err: any) {
    console.log(err);

    const errorList = err?.error?.password1;
    if (!errorList) return;

    if (Array.isArray(errorList)) {
      this.notification.doNotification(errorList.join(' '));
      return;
    }

    if (typeof errorList === 'string') {
      this.notification.doNotification(errorList);
    }
  }
}

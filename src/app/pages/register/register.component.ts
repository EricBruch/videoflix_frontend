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
    [isSignUpDisabled]="!form.valid"
  ></app-register-presentation>`,
})
export class RegisterComponent {
  form;

  constructor(fb: FormBuilder) {
    this.form = fb.group(
      {
        username: fb.control('', { validators: [Validators.minLength(3)] }),
        email: fb.control('', {
          validators: [Validators.minLength(3), Validators.email],
        }),
        password1: fb.control(
          { value: '', disabled: false },
          { validators: [Validators.minLength(8)] }
        ),
        password2: fb.control(
          { value: '', disabled: false },
          { validators: [Validators.minLength(8)] }
        ),
      },
      { validators: matchPasswValidator }
    );

    this.form.valueChanges.subscribe((value) => console.log({ value }));
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
    (signUp)="onSignUp()"
  ></app-register-presentation>`,
})
export class PageComponent implements OnInit {
  form;

  constructor(fb: FormBuilder, private facade: RegisterFacade) {
    this.form = fb.group(
      {
        username: fb.control('', {
          validators: [...minChars(3)],
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

  ngOnInit(): void {
    // todo add note for user if was created successful or not
    this.facade.createdSuccessful.subscribe((val) => console.log({ val }));
  }

  onSignUp() {
    this.facade
      .registerUser(this.form.getRawValue() as RegisterUser)
      .pipe(first())
      .subscribe();
  }
}

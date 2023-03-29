import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPresentationComponent } from './login-presentation.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { minChars } from 'src/app/shared/validators';
import { LoginUser } from 'src/app/shared';
import { UserFacade } from 'src/app/core';
import { first } from 'rxjs';

export type LoginForm = FormGroup<{
  username: FormControl<string | null>;
  password: FormControl<string | null>;
}>;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, LoginPresentationComponent],
  changeDetection: ChangeDetectionStrategy.Default,
  template: `<app-login-presentation
    [form]="form"
    [isLoginDisabled]="!form.valid"
    (login)="onLogin()"
  ></app-login-presentation>`,
})
export class LoginComponent {
  form;

  constructor(private userFacade: UserFacade, fb: FormBuilder) {
    this.form = fb.nonNullable.group({
      username: fb.control('', {
        validators: [...minChars(3)],
      }),
      password: fb.control('', {
        validators: [...minChars(8)],
      }),
    });
  }

  onLogin() {
    this.userFacade
      .login(this.form.getRawValue() as LoginUser)
      .pipe(first())
      .subscribe();
  }
}

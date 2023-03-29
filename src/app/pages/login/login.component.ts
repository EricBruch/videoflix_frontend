import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPresentationComponent } from './login-presentation.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { minChars } from 'src/app/shared/validators';
import { LoginUser } from 'src/app/shared';
import { UserFacade } from 'src/app/core';
import { filter, first, Subscription, tap } from 'rxjs';
import { Router } from '@angular/router';

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
export class LoginComponent implements OnInit, OnDestroy {
  form;

  private subs = new Subscription();

  constructor(
    private userFacade: UserFacade,
    private router: Router,
    fb: FormBuilder
  ) {
    this.form = fb.nonNullable.group({
      username: fb.control('', {
        validators: [...minChars(3)],
      }),
      password: fb.control('', {
        validators: [...minChars(8)],
      }),
    });
  }

  ngOnInit(): void {
    this.subs.add(
      this.userFacade.isAuthenticated$
        .pipe(
          filter((isAuthenticated) => !!isAuthenticated),
          tap(() => this.router.navigateByUrl('home'))
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onLogin() {
    this.userFacade
      .login(this.form.getRawValue() as LoginUser)
      .pipe(first())
      .subscribe();
  }
}

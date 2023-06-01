import { Injectable } from '@angular/core';
import { Subject, first, tap } from 'rxjs';
import {
  PasswordControllerService,
  PasswordResetConfirm,
} from 'src/app/core/password-controller.service';

@Injectable({
  providedIn: 'root',
})
export class PasswordFacade {
  private passwordResetSetSubject$ = new Subject<void>();
  passwordResetSet$ = this.passwordResetSetSubject$.asObservable();

  private passwordConfirmSubject$ = new Subject<void>();
  passwordConfirm$ = this.passwordConfirmSubject$.asObservable();

  constructor(private service: PasswordControllerService) {}

  requestPasswordReset(username: string) {
    this.service
      .requestReset(username)
      .pipe(
        first(),
        tap(() => this.passwordResetSetSubject$.next())
      )
      .subscribe();
  }

  requestPasswordConfirm(c: PasswordResetConfirm) {
    this.service
      .confirmReset(c)
      .pipe(
        first(),
        tap(() => this.passwordConfirmSubject$.next())
      )
      .subscribe();
  }
}

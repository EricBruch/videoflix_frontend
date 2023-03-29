import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { LoginUser } from '../shared';
import { AuthControllerService } from './auth-controller.service';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  private _loginSuccessful = new BehaviorSubject<boolean | null>(null);
  loginSuccessful = this._loginSuccessful.asObservable();

  constructor(private service: AuthControllerService) {}

  login(user: LoginUser) {
    return this.service.loginUser(user).pipe(
      tap({
        next: (token) => {
          this._loginSuccessful.next(true);
          sessionStorage.setItem('token', token.key);
        },
        error: () => this._loginSuccessful.next(false),
      })
    );
  }
}

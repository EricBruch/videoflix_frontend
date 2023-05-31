import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { LoginUser } from '../shared';
import { AuthControllerService } from './auth-controller.service';
import { authToken } from './common';
import { NotificationService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  private _isAuthenticated$ = new BehaviorSubject<boolean | null>(null);
  isAuthenticated$ = this._isAuthenticated$.asObservable();

  private notification = inject(NotificationService);
  private service = inject(AuthControllerService);

  login(user: LoginUser) {
    return this.service.loginUser(user).pipe(
      tap({
        next: (token) => {
          this._isAuthenticated$.next(true);
          authToken.setToken(token.key);
          this.notification.doNotification('Authorization successful!');
        },
        error: () => {
          this._isAuthenticated$.next(false);
          this.notification.doNotification('Autorization not successful!');
        },
      })
    );
  }

  isCurrAuthenticated = () => !!this._isAuthenticated$.value;

  checkForAuthentication() {
    if (authToken.hasToken()) this._isAuthenticated$.next(true);
  }

  logout() {
    authToken.deleteToken();
    this._isAuthenticated$.next(false);
    this.notification.doNotification('User was logged out!');
  }
}

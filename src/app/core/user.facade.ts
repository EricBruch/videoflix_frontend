import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { LoginUser } from '../shared';
import { AuthControllerService } from './auth-controller.service';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  private _isAuthenticated$ = new BehaviorSubject<boolean | null>(null);
  isAuthenticated$ = this._isAuthenticated$.asObservable();

  constructor(private service: AuthControllerService) {}

  login(user: LoginUser) {
    return this.service.loginUser(user).pipe(
      tap({
        next: (token) => {
          this._isAuthenticated$.next(true);
          sessionStorage.setItem('token', token.key);
        },
        error: () => this._isAuthenticated$.next(false),
      })
    );
  }
}

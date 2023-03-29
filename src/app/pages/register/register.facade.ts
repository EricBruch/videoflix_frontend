import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { AuthControllerService } from 'src/app/core';
import { RegisterUser } from 'src/app/shared';

@Injectable({
  providedIn: 'root',
})
export class RegisterFacade {
  private _createdSuccessful = new BehaviorSubject<boolean | null>(null);
  createdSuccessful = this._createdSuccessful.asObservable();

  constructor(private service: AuthControllerService) {}

  registerUser = (user: RegisterUser) =>
    this.service.registerUser(user).pipe(
      tap({
        next: () => this._createdSuccessful.next(true),
        error: () => this._createdSuccessful.next(false),
      })
    );
}

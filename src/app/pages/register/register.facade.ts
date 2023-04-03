import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { AuthControllerService } from 'src/app/core';
import { NotificationService } from 'src/app/core';
import { RegisterUser } from 'src/app/shared';

@Injectable({
  providedIn: 'root',
})
export class RegisterFacade {
  private notification = inject(NotificationService);
  private service = inject(AuthControllerService);

  registerUser = (user: RegisterUser) =>
    this.service.registerUser(user).pipe(
      tap({
        next: () =>
          this.notification.doNotification(
            'Account was created successful. Check your emails to confirm your account!'
          ),
        error: () =>
          this.notification.doNotification('Account could not be created!'),
      })
    );
}

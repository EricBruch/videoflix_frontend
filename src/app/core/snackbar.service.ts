import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private _snackbar = inject(MatSnackBar);

  doNotification = (txt: string, action = 'Info') =>
    this._snackbar.open(txt, action, {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      direction: 'ltr',
    });
}

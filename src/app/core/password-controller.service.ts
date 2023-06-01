import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const pwUrl = `${environment.baseUrl}/api/v1/password` as const;

export interface PasswordAction {
  message: 'executed successfully';
}

export interface PasswordResetConfirm {
  newPassword1: string;
  newPassword2: string;
  sharedSecret: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class PasswordControllerService {
  constructor(private http: HttpClient) {}

  requestReset = (username: string) =>
    this.http.post<PasswordAction>(`${pwUrl}/forgot/`, { username });

  confirmReset = (params: PasswordResetConfirm) =>
    this.http.post(`${pwUrl}/forgot/change/`, params);
}

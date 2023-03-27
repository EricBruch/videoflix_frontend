import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const url = 'http://127.0.0.1:8000/api/v1/dj-rest-auth/registration/';

export interface RegisterUser {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthControllerService {
  constructor(private http: HttpClient) {}

  registerUser = (user: RegisterUser) => this.http.post<void>(url, user);
}

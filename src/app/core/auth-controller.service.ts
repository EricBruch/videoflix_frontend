import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IToken, LoginUser, RegisterUser } from '../shared';
import { environment as env } from 'src/environments/environment';

const api = `${env.baseUrl}/api/v1` as const;
const authApi = `${api}/dj-rest-auth` as const;

@Injectable({
  providedIn: 'root',
})
export class AuthControllerService {
  constructor(private http: HttpClient) {}

  registerUser = (user: RegisterUser) =>
    this.http.post<void>(`${authApi}/registration/`, user);

  loginUser = (user: LoginUser) =>
    this.http.post<IToken>(`${authApi}/login/`, user);
}

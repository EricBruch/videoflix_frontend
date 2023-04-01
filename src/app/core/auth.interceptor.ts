import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { authToken } from './common';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(this.addAuthHeader(request));
  }

  private addAuthHeader(req: HttpRequest<unknown>) {
    const t = authToken.getToken();

    return !t
      ? req
      : req.clone({
          headers: req.headers.set('Authorization', `Token ${t}`),
        });
  }
}

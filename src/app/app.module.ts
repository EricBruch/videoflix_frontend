import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './layouting';
import { AuthInterceptor } from './core';
import { DatePipe } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import * as Sentry from '@sentry/angular-ivy';
import { Router } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TopbarComponent,
    HttpClientModule,
    MatSnackBarModule,
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // {
    //   provide: ErrorHandler,
    //   useValue: Sentry.createErrorHandler({
    //     showDialog: true,
    //   }),
    // },
    // {
    //   provide: Sentry.TraceService,
    //   deps: [Router],
    // },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: () => () => {},
    //   deps: [Sentry.TraceService],
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

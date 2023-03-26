import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './layouting';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, TopbarComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

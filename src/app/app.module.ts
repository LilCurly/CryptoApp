import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { iosTransitionAnimation } from './transitions/ios-custom.transition';

let ionic = [
  IonicModule.forRoot({
    navAnimation: iosTransitionAnimation,
  }),
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ...ionic, AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

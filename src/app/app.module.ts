import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LatestPage } from '../pages/latest/latest';
import { BestPage } from '../pages/best/best';
import { MostCommentedPage } from '../pages/most-commented/most-commented';
import { TabsPage } from '../pages/tabs/tabs';

import { GeolocationService } from '../+core/services';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';

@NgModule({
  declarations: [
    MyApp,
    LatestPage,
    BestPage,
    MostCommentedPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LatestPage,
    BestPage,
    MostCommentedPage,
    TabsPage
  ],
  providers: [
    Geolocation,
    NativeGeocoder,
    GeolocationService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

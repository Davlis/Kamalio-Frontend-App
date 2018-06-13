import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ProfilePage } from '../pages/profile/profile';
import { PostViewPage } from '../pages/post-view/post-view';

import { LatestPage } from '../pages/latest/latest';
import { BestPage } from '../pages/best/best';
import { MostCommentedPage } from '../pages/most-commented/most-commented';
import { TabsPage } from '../pages/tabs/tabs';

import { GeolocationService, LoginService, PostService } from '../+core/services';
import { ListHeaderComponent, PostListComponent } from '../+core/components';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';

import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [
    MyApp,
    ProfilePage,
    PostViewPage,
    ListHeaderComponent,
    PostListComponent,
    LatestPage,
    BestPage,
    MostCommentedPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProfilePage,
    PostViewPage,
    ListHeaderComponent,
    PostListComponent,
    LatestPage,
    BestPage,
    MostCommentedPage,
    TabsPage
  ],
  providers: [
    Geolocation,
    NativeGeocoder,
    GeolocationService,
    LoginService,
    PostService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { MyApp } from './app.component';

import {
  CreatePostPage,
  ProfilePage,
  PostViewPage,
  LatestPage,
  BestPage,
  MostCommentedPage,
  TabsPage
} from '../pages';

import { GeolocationService, LoginService, PostService, CommentService } from '../+core/services';
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
    CreatePostPage,
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
    CreatePostPage,
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
    Device,
    NativeGeocoder,
    GeolocationService,
    LoginService,
    PostService,
    CommentService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

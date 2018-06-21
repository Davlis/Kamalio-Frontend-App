import { Component, ViewChild } from '@angular/core';
import { Platform, Events, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginService } from '../+core/services';
import { TabsPage } from '../pages/tabs';
import { PostViewPage } from '../pages/post-view';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  @ViewChild(Nav) nav: Nav;

  constructor(private platform: Platform,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private loginService: LoginService,
              private events: Events) {
    this.platform.ready()
    .then(() => this.loginService.ready())
    .then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.listener();
  }

  private listener() {
    this.events.subscribe('post:created', async (postData) => {
      const indexView = this.nav.indexOf(this.nav.getActive());

      await this.nav.push(PostViewPage, postData);
      this.nav.remove(indexView);
    });
  }
}

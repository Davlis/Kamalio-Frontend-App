import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginService, PostService } from '../../+core/services';
import { Post } from '../../+core/models';
import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-latest',
  templateUrl: 'latest.html'
})
export class LatestPage {

  public settingsPage = ProfilePage;
  public latestPosts: Post[];

  constructor(public navCtrl: NavController,
              public loginService: LoginService,
              public postService: PostService) {
  }

  public async ionViewWillEnter() {
    await this.loginService.ready();

    const query = {
      latitude: this.loginService.get('lat'),
      longitude: this.loginService.get('lon'),
      section: 'LATEST'
    };

    this.latestPosts = await this.postService.getPosts(query);
  }
}

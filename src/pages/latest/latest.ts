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

  private query = { date: 1 };

  constructor(public navCtrl: NavController,
              public loginService: LoginService,
              public postService: PostService) {
  }

  public ngOnInit() {
    this.latestPosts = this.postService.getPosts(this.query);
  }
}

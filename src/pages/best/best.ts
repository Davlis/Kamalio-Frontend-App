import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginService, PostService } from '../../+core/services';
import { Post } from '../../+core/models';
import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-best',
  templateUrl: 'best.html'
})
export class BestPage {

  public settingsPage = ProfilePage;
  public bestPosts: Post[];

  private query = { upvotes: 1 };

  constructor(public navCtrl: NavController,
              public loginService: LoginService,
              public postService: PostService) {
  }

  public ionViewWillEnter() {
    this.bestPosts = this.postService.getPosts(this.query);
  }
}

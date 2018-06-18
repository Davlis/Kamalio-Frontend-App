import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginService, PostService } from '../../+core/services';
import { Post } from '../../+core/models';
import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-most-commented',
  templateUrl: 'most-commented.html'
})
export class MostCommentedPage {

  public settingsPage = ProfilePage;
  public commentedPosts: Post[];

  constructor(public navCtrl: NavController,
              public loginService: LoginService,
              public postService: PostService) {
  }

  public ionViewWillEnter() {
    this.reloadPosts();
  }

  public async reloadPosts() {
    await this.loginService.ready();

    const query = {
      latitude: this.loginService.get('lat'),
      longitude: this.loginService.get('lon'),
      section: 'LOUDEST'
    };

    this.commentedPosts = await this.postService.getPosts(query);
  }
}

import { Component } from '@angular/core';
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

  constructor(public loginService: LoginService,
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

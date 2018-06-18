import { Component } from '@angular/core';
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
      section: 'BEST'
    };

    this.bestPosts = await this.postService.getPosts(query);
  }
}

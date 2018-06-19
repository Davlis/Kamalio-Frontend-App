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
  public offset: number = 0;
  public limit: number = 20;
  public infinite;

  constructor(public loginService: LoginService,
              public postService: PostService) {
  }

  public ionViewWillEnter() {
    this.loadPosts(true);
    if (this.infinite) {
      this.infinite.enable(true);
    }
  }

  public async loadPosts(reload?: boolean, refresher?) {
    await this.loginService.ready();
    let offset;

    if (reload) {
      this.offset = 0;
    }

    offset = this.offset;

    const query = {
      latitude: this.loginService.get('lat'),
      longitude: this.loginService.get('lon'),
      section: 'BEST',
      offset,
      limit: this.limit
    };

    const result = await this.postService.getPosts(query);

    if (reload) {
      this.bestPosts = [];

      if (this.infinite) {
        this.infinite.enable(true);
      }
    }

    this.bestPosts = this.bestPosts.concat(result.rows);

    if (refresher) {
      refresher.complete();
    }

    this.offset += this.limit;

    return result.count;
  }

  public getRefreshFunction() {
    return this.loadPosts.bind(this, true);
  }

  public async loadInfite(infiniteScroll) {
    const count = await this.loadPosts();
    infiniteScroll.complete();
    if (count === this.bestPosts.length) {
      infiniteScroll.enable(false);
    }

    this.infinite = infiniteScroll;
  }
}

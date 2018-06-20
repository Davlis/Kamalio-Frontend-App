import { Component } from '@angular/core';
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
  public offset: number = 0;
  public limit: number = 20;
  public queryTime: Date = new Date();
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
      this.queryTime = new Date();
    }

    offset = this.offset;

    const query = {
      latitude: this.loginService.get('lat'),
      longitude: this.loginService.get('lon'),
      section: 'LATEST',
      offset,
      limit: this.limit,
      queryTime: this.queryTime.toISOString()
    };

    const result = await this.postService.getPosts(query);

    if (reload) {
      this.latestPosts = [];

      if (this.infinite) {
        this.infinite.enable(true);
      }
    }

    this.latestPosts = this.latestPosts.concat(result.rows);

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
    if (count === this.latestPosts.length) {
      infiniteScroll.enable(false);
    }

    this.infinite = infiniteScroll;
  }
}

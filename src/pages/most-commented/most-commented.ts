import { Component, Input } from '@angular/core';
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

  private query = { comments: 1 };

  constructor(public navCtrl: NavController,
              public loginService: LoginService,
              public postService: PostService) {
  }

  public ngOnInit() {
    this.commentedPosts = this.postService.getPosts(this.query);
  }
}

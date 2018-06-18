import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Post, Comment } from '../../+core/models';
import { PostService, LoginService, CommentService } from '../../+core/services';
import { PostListComponent } from '../../+core/components';
import { TablessPage } from '../../+core/components/tabless-page-component';

@Component({
  selector: 'post-view',
  templateUrl: 'post-view.html'
})
export class PostViewPage extends TablessPage {
  public post: Post;
  public comments: Comment[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public postService: PostService,
              public loginService: LoginService,
              public commentService: CommentService) {
    super();

    this.post = this.navParams.data;
    this.comments = this.commentService.getComments(this.post.id);
  }
}

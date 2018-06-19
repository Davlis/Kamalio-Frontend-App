import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Post, Comment } from '../../+core/models';
import { PostService, LoginService, CommentService } from '../../+core/services';
import { TablessPage } from '../../+core/components/tabless-page-component';
import { CreatePostPage } from '../create-post';

@Component({
  selector: 'post-view',
  templateUrl: 'post-view.html'
})
export class PostViewPage extends TablessPage {
  public post: Post;
  public comments: Comment[] = [];
  public createPostPage = CreatePostPage;

  constructor(public navParams: NavParams,
              public postService: PostService,
              public loginService: LoginService,
              public commentService: CommentService) {
    super();
    this.init();
  }

  private init() {
    this.post = this.navParams.data;
  }

  private async refreshComments() {
    this.comments = await this.commentService.getComments(this.post.id);
  }
}

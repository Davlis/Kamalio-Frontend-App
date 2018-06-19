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
  public offset: number = 0;
  public limit: number = 20;
  public infinite;

  constructor(public navParams: NavParams,
              public postService: PostService,
              public loginService: LoginService,
              public commentService: CommentService) {
    super();
    this.init();
  }

  private init() {
    this.post = this.navParams.data;
    this.loadComments(true);
    if (this.infinite) {
      this.infinite.enable(true);
    }
  }

  private async loadComments(reload?: boolean, refresher?) {
    let offset;

    if (reload) {
      this.offset = 0;
    }

    offset = this.offset;

    const query = {
      postId: this.post.id,
      offset,
      limit: this.limit
    };

    const result  = await this.commentService.getComments(query);

    if (reload) {
      this.comments = [];

      if (this.infinite) {
        this.infinite.enable(true);
      }
    }

    this.comments = this.comments.concat(result.rows);

    if (refresher) {
      refresher.complete();
    }

    this.offset += this.limit;

    return result.count;
  }

  public async loadInfite(infiniteScroll) {
    const count = await this.loadComments();
    infiniteScroll.complete();
    if (count === this.comments.length) {
      infiniteScroll.enable(false);
    }

    this.infinite = infiniteScroll;
  }
}

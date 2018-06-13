import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Post, Comment } from '../../+core/models';
import { PostService, CommentService } from '../../+core/services';

@Component({
  selector: 'post-view',
  templateUrl: 'post-view.html'
})
export class PostViewPage {
  public post: Post;
  public comments: Comment[] = [];

  private tabBarElement: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public postService: PostService,
              public commentService: CommentService) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

    this.post = this.navParams.data;
    this.comments = this.commentService.getComments(this.post.id);
  }

  public ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  public ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }
}

import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PostService } from '../../services';
import { Post } from '../../models';
import { PostViewPage } from '../../../pages/post-view/post-view';

@Component({
  selector: 'post-list',
  templateUrl: 'post-list.component.html'
})
export class PostListComponent {

  public postPage = PostViewPage;

  @Input() public posts: Post[];

  constructor(public postService: PostService) {
  }

  public getShortenedContent(content: string) {
    if (content.length > 140) {
      content = content.slice(0, 137) + '...';
    }

    return content;
  }
}

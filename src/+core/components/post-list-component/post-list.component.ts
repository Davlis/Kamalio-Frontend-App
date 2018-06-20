import { Component, Input } from '@angular/core';
import { PhotoViewer } from '@ionic-native/photo-viewer';

import { PostService } from '../../services';
import { Post } from '../../models';
import { PostViewPage } from '../../../pages/post-view';

@Component({
  selector: 'post-list',
  templateUrl: 'post-list.component.html'
})
export class PostListComponent {

  public postPage = PostViewPage;

  @Input() public posts: Post[];

  constructor(public postService: PostService,
              private photoViewer: PhotoViewer) {
  }

  public getShortenedContent(content: string) {
    if (content.length > 140) {
      content = content.slice(0, 137) + '...';
    }

    return content;
  }

  public showPhoto(post: Post) {
    this.photoViewer.show(post.photoUrl, post.title);
  }
}

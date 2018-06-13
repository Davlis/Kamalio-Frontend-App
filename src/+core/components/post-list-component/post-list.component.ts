import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PostService } from '../../services';
import { Post } from '../../models';

@Component({
  selector: 'post-list',
  templateUrl: 'post-list.component.html'
})
export class PostListComponent {

  @Input() public posts: Post[];

  constructor(public postService: PostService) {
  }
}

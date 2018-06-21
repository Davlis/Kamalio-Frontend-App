import { Component } from '@angular/core';

import { LatestPage } from '../latest/latest';
import { BestPage } from '../best/best';
import { MostCommentedPage } from '../most-commented/most-commented';
import { CreatePostPage } from '../create-post/create-post';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = LatestPage;
  tab2Root = BestPage;
  tab3Root = MostCommentedPage;
  createPost = CreatePostPage;

  constructor() {

  }
}

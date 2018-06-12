import { Injectable } from '@angular/core';
import { Post } from '../models';

@Injectable()
export class PostService {
  public getPosts(query?: any): Post[] {
    const posts = [{
      title: 'Title',
      date: '2018-06-12T00:16:06.067Z',
      thumbPhotoUrl: 'https://ionicframework.com/dist/preview-app/www/assets/img/advance-card-bttf.png',
      description: 'Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a DeLorean?! Whoa. This is heavy.',
      upvotes: 12,
      comments: 4,
      active: false
    }, {
      title: 'Title 2',
      date: '2018-06-11T00:16:06.067Z',
      thumbPhotoUrl: 'https://ionicframework.com/dist/preview-app/www/assets/img/advance-card-bttf.png',
      description: 'Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a DeLorean?! Whoa. This is heavy.',
      upvotes: 2,
      comments: 7,
      active: true
    }, {
      title: 'Title 3',
      date: '2018-06-09T00:16:06.067Z',
      thumbPhotoUrl: 'https://ionicframework.com/dist/preview-app/www/assets/img/advance-card-bttf.png',
      description: 'Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a DeLorean?! Whoa. This is heavy.',
      upvotes: 18,
      comments: 5,
      active: false
    }];

    return posts.sort((a, b) => {
      if (query.upvotes) {
        return b.upvotes - a.upvotes;
      } else if (query.comments) {
        return b.comments - a.comments;
      } else if (query.date) {
        if (b.date > a.date) {
          return 1;
        } else if(b.date < a.date) {
          return -1;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    });
  }
}

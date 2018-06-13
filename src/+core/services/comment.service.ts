import { Injectable } from '@angular/core';
import { Comment } from '../models';

@Injectable()
export class CommentService {
  private comments: Comment[] = [{
    id: 'ddd1',
    userId: 'usera',
    message: 'comment',
    date: '2018-06-11T00:16:06.067Z'
  }, {
    id: 'ddd2',
    userId: 'userb',
    message: 'comment',
    date: '2018-06-10T00:16:06.067Z'
  }, {
    id: 'ddd3',
    userId: 'userb',
    message: 'comment',
    date: '2018-06-10T00:15:06.067Z'
  }];

  public getComments(postId: string): Comment[] {
    return this.comments.sort((a, b) => {
      if (b.date > a.date) {
        return 1;
      } else if(b.date < a.date) {
        return -1;
      } else {
        return 0;
      }
    });
  }
}

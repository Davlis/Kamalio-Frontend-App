import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Post } from '../models';

@Injectable()
export class PostService {

  private currentPosts: Post[] = [];

  constructor(private dataService: DataService) {
  }

  public async getPosts(query: any): Promise<Post[]> {
    this.currentPosts = (await this.dataService.getQueryData('posts', query)).rows;

    return this.currentPosts.sort((a, b) => {
      if (query.rating) {
        return b.rating - a.rating;
      } else if (query.commentCount) {
        return b.commentCount - a.commentCount;
      } else if (query.createdAt) {
        if (b.createdAt > a.createdAt) {
          return 1;
        } else if(b.createdAt < a.createdAt) {
          return -1;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    });
  }

  public async createPost(data: any) {
    return this.dataService.postData('posts', data);
  }

  public changeUpvote(p: Post) {
    p.myVote = p.myVote === 0 ? 1 : 0;
    p.rating += p.myVote === 1 ? 1 : -1;
    this.dataService.postData(`posts/${p.id}/votes`, { value: p.myVote });
  }
}

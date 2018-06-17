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

  public createPost(post: Post) {
    return new Promise((resolve, reject) => {
      return this.dataService.postData('posts', post);
    });
  }

  public changeUpvote(id: string) {
    const post = this.currentPosts.find(el => el.id === id);

    if (post) {
      post.active = !post.active;
      post.rating += post.active ? 1 : -1;
    }
  }
}

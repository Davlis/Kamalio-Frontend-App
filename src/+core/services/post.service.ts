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

    return this.currentPosts;
  }

  public async createPost(data: any) {
    return this.dataService.postData('posts', data);
  }

  public async editPost(id: string, data: any) {
    return this.dataService.putData(`posts/${id}`, data);
  }

  public changeUpvote(p: Post) {
    p.myVote = p.myVote === 0 ? 1 : 0;
    p.rating += p.myVote === 1 ? 1 : -1;
    this.dataService.postData(`posts/${p.id}/votes`, { value: p.myVote });
  }
}

import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Post } from '../models';

@Injectable()
export class PostService {

  constructor(private dataService: DataService) {
  }

  public async getPosts(query: any): Promise<any> {
    return this.dataService.getQueryData('posts', query);
  }

  public async createPost(data: any) {
    return this.dataService.postData('posts', data);
  }

  public async editPost(id: string, data: any) {
    return this.dataService.putData(`posts/${id}`, data);
  }

  public async deletePost(id: string) {
    return this.dataService.deleteData(`posts/${id}`);
  }

  public changeUpvote(p: Post) {
    p.myVote = p.myVote === 0 ? 1 : 0;
    p.rating += p.myVote === 1 ? 1 : -1;
    this.dataService.postData(`posts/${p.id}/votes`, { value: p.myVote });
  }
}

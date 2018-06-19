import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Comment } from '../models';

@Injectable()
export class CommentService {
  constructor(private dataService: DataService) {
  }

  public async getComments(postId: string): Promise<Comment[]> {  
    const comments = (await this.dataService.getQueryData('comments', { postId })).rows;

    return comments;
  }
}

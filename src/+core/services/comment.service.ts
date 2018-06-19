import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class CommentService {
  constructor(private dataService: DataService) {
  }

  public async getComments(query: any): Promise<any> {
    return this.dataService.getQueryData('comments', query);
  }

  public async createComment(data: any) {
    return this.dataService.postData('comments', data);
  }

  public async editComment(id: string, data: any) {
    return this.dataService.putData(`comments/${id}`, data);
  }

  public async deleteComment(id: string) {
    return this.dataService.deleteData(`comments/${id}`);
  }
}

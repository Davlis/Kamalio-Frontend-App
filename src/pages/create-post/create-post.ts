import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { TablessPage } from '../../+core/components/tabless-page-component';
import { PostService } from '../../+core/services';
import { Post } from '../../+core/models';

@Component({
  selector: 'create-post',
  templateUrl: 'create-post.html'
})
export class CreatePostPage extends TablessPage {
  public post: Post = new Post();

  constructor(public navCtrl: NavController,
              public postService: PostService,
              private toastCtrl: ToastController) {
    super();
  }

  public createPost() {
    this.postService.createPost(this.post)
      .then(() => {
        this.post.title = '';
        this.post.description = '';
        const toast = this.toastCtrl.create({
          message: 'Post created',
          duration: 3000,
          position: 'bottom',
          showCloseButton: true
        });

        toast.present();

        this.navCtrl.pop();
      }).catch(err => {
        const toast = this.toastCtrl.create({
          message: 'Error while creating post',
          duration: 3000,
          position: 'bottom',
          showCloseButton: true
        });

        toast.present();
      });
  }
}

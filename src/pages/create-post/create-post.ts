import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { TablessPage } from '../../+core/components/tabless-page-component';
import { PostService, LoginService } from '../../+core/services';
import { PostViewPage } from '../post-view/post-view';

@Component({
  selector: 'create-post',
  templateUrl: 'create-post.html'
})
export class CreatePostPage extends TablessPage {
  public title: string;
  public content: string;

  constructor(public navCtrl: NavController,
              public postService: PostService,
              public loginService: LoginService,
              private toastCtrl: ToastController) {
    super();
  }

  public async createPost() {
    await this.loginService.ready();

    const post = {
      title: this.title,
      content: this.content,
      latitude: this.loginService.get('lat'),
      longitude: this.loginService.get('lon')
    };

    this.postService.createPost(post)
      .then(async result => {
        this.title = '';
        this.content = '';
        const toast = this.toastCtrl.create({
          message: 'Post created',
          duration: 2500,
          position: 'bottom',
          showCloseButton: true
        });

        toast.present();

        const indexView = this.navCtrl.indexOf(this.navCtrl.getActive());

        await this.navCtrl.push(PostViewPage, result);
        this.navCtrl.remove(indexView);
      }).catch(err => {
        const toast = this.toastCtrl.create({
          message: 'Error while creating post',
          duration: 2500,
          position: 'bottom',
          showCloseButton: true
        });

        toast.present();
      });
  }
}

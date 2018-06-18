import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { TablessPage } from '../../+core/components/tabless-page-component';
import { PostService, LoginService } from '../../+core/services';
import { Post } from '../../+core/models';

@Component({
  selector: 'create-post',
  templateUrl: 'create-post.html'
})
export class CreatePostPage extends TablessPage {
  public prevPost: Post = null;
  public title: string;
  public content: string;

  constructor(public postService: PostService,
              public loginService: LoginService,
              private toastCtrl: ToastController,
              private navCtrl: NavController,
              public navParams: NavParams,
              public events: Events) {
    super();
  }

  public ionViewWillEnter() {
    const prevPost = this.navParams.data;

    if (prevPost && prevPost.title && prevPost.content) {
      this.prevPost = prevPost;
      this.title = prevPost.title;
      this.content = prevPost.content;
    } else {
      this.prevPost = null;
    }
  }

  public async checkPost() {
    await this.loginService.ready();

    if (!this.title) {
      const toast = this.toastCtrl.create({
        message: 'Post have to have a title',
        duration: 2500,
        position: 'bottom',
        showCloseButton: true
      });

      toast.present();

      return;
    } else if (!this.content) {
      const toast = this.toastCtrl.create({
        message: 'Post have to have content',
        duration: 2500,
        position: 'bottom',
        showCloseButton: true
      });

      toast.present();

      return;
    }

    if (this.prevPost) {
      this.editPost();
    } else {
      this.createPost();
    }
  }

  public editPost() {
    const post = {
      title: this.title,
      content: this.content
    };

    this.postService.editPost(this.prevPost.id, post)
      .then(async result => {

        this.prevPost.title = this.title;
        this.prevPost.content = this.content;

        this.title = '';
        this.content = '';
        this.prevPost = null;

        const toast = this.toastCtrl.create({
          message: 'Post updated',
          duration: 2500,
          position: 'bottom',
          showCloseButton: true
        });

        toast.present();

        this.navCtrl.pop();
      }).catch(err => {
        const toast = this.toastCtrl.create({
          message: 'Error while updating post',
          duration: 2500,
          position: 'bottom',
          showCloseButton: true
        });

        toast.present();
      });
  }

  public createPost() {
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

        this.events.publish('post:created', result.post);
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

import { Component, Inject } from '@angular/core';
import { NavController, NavParams, ToastController, Events, Platform } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { Dialogs } from '@ionic-native/dialogs';

import { TablessPage } from '../../+core/components/tabless-page-component';
import { PostService, LoginService } from '../../+core/services';
import { Post } from '../../+core/models';
import { EnvVariables } from '../../environment';

@Component({
  selector: 'create-post',
  templateUrl: 'create-post.html'
})
export class CreatePostPage extends TablessPage {
  public prevPost: Post = null;
  public title: string;
  public content: string;
  public uri: string;
  public fileTransfer: FileTransferObject;

  constructor(public postService: PostService,
              public loginService: LoginService,
              private toastCtrl: ToastController,
              private navCtrl: NavController,
              private navParams: NavParams,
              private events: Events,
              private imagePicker: ImagePicker,
              private camera: Camera,
              private platform: Platform,
              private transfer: FileTransfer,
              private dialogs: Dialogs,
              @Inject(EnvVariables) private env) {
    super();
    this.fileTransfer = this.transfer.create();
  }

  public ionViewWillEnter() {
    super.ionViewWillEnter();
    const prevPost = this.navParams.data;

    if (prevPost && prevPost.title && prevPost.content) {
      this.prevPost = prevPost;
      this.title = prevPost.title;
      this.content = prevPost.content;
    } else {
      this.prevPost = null;
    }
  }

  private createToast(message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 2500,
      position: 'bottom',
      showCloseButton: true
    });

    toast.present();
  }

  public async checkPost() {
    await this.loginService.ready();

    if (!this.title) {
      this.createToast('Post have to have a title');
      return;
    } else if (!this.content) {
      this.createToast('Post have to have content');
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

        this.createToast('Post updated');

        this.navCtrl.pop();
      }).catch(err => {
        this.createToast('Error while updating post');
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
        await this.uploadFile(result.post);

        this.title = '';
        this.content = '';
        this.createToast('Post created');

        this.events.publish('post:created', result.post);
      }).catch(err => {
        this.createToast('Error while creating post');
      });
  }

  public async getFilePermission() {
    if (this.platform.is('android')) {
      const permission = await this.imagePicker.hasReadPermission();

      if (!permission) {
        await this.imagePicker.requestReadPermission();
      }

      this.getFile();
    } else {
      this.getFile();
    }
  }

  public async getPhoto() {
    const options: CameraOptions = {
      quality: 90,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.uri = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      this.uri = '';
      this.createToast('Error when taking picture');
    });
  }

  private getFile() {
    if (!(this.platform.is('ios') || this.platform.is('android'))) {
      console.log('This platform is not supported');
      return;
    }

    this.imagePicker.getPictures({ maximumImagesCount: 1, quality: 90, outputType: 0 })
      .then((results) => {
        this.uri = results[0];
      }, (err) => {
        this.uri = '';
        this.createToast('Error when picking picture');
      });
  }

  private uploadFile(post: Post) {
    return new Promise((resolve, reject) => {
      if (!this.uri) {
        resolve();
      }

      this.fileTransfer.upload(this.uri, encodeURI(this.env.apiEndpoint + `/posts/${post.id}/photo`), {
        httpMethod: 'PUT',
        mimeType: 'multipart/form-data',
        headers: { 'Authorization': this.loginService.tokenService.accessToken }
      }).then(result => {
        const res = JSON.parse(result.response) as Post;
        post.thumbPhotoUrl = res.thumbPhotoUrl;
        post.photoUrl = res.photoUrl;
        resolve();
      }).catch(err => {
        reject();
      });
    });
  }

  private deletePost() {
    const labels = ['Yes', 'No'];

    this.dialogs.confirm('Are you sure you want to delete?', 'Confirmation', labels)
      .then((index) => {
        if (index === 1) {
          this.postService.deletePost(this.prevPost.id)
            .then(() => {
              this.navCtrl.pop();
              this.navCtrl.pop();
            }).catch(err => {
              this.createToast('Error while removing post');
            });
        }
      }, (err) => {
        console.error(err);
      }).catch(err => {
        console.error(err);
      });
  }
}

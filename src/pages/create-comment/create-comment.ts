import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';

import { TablessPage } from '../../+core/components/tabless-page-component';
import { CommentService, LoginService } from '../../+core/services';
import { Comment } from '../../+core/models';

@Component({
  selector: 'create-comment',
  templateUrl: 'create-comment.html'
})
export class CreateCommentPage extends TablessPage {
  public postId: string;
  public prevComment: Comment = null;
  public content: string;

  constructor(public commentService: CommentService,
              public loginService: LoginService,
              private toastCtrl: ToastController,
              private navCtrl: NavController,
              private navParams: NavParams,
              private events: Events,
              private dialogs: Dialogs) {
    super();
  }

  public ionViewWillEnter() {
    super.ionViewWillEnter();
    if (typeof this.navParams.data === 'string') {
      this.postId = this.navParams.data;
      return;
    }

    const prevComment = this.navParams.data;

    if (prevComment && prevComment.content) {
      this.prevComment = prevComment;
      this.content = prevComment.content;
    } else {
      this.prevComment = null;
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

  public async checkComment() {
    await this.loginService.ready();

    if (!this.content) {
      this.createToast('Comment have to have content');
      return;
    }

    if (this.prevComment) {
      this.editComment();
    } else {
      this.createComment();
    }
  }

  public editComment() {
    const comment = {
      content: this.content
    };

    this.commentService.editComment(this.prevComment.id, comment)
      .then(async result => {

        this.prevComment.content = this.content;

        this.content = '';
        this.prevComment = null;

        this.createToast('Comment updated');

        this.navCtrl.pop();
      }).catch(err => {
        this.createToast('Error while updating comment');
      });
  }

  public createComment() {
    const comment = {
      postId: this.postId,
      content: this.content
    };

    this.commentService.createComment(comment)
      .then(async result => {
        this.content = '';
        this.createToast('Comment created');

        this.navCtrl.pop();

        this.events.publish('comment:created', result);
      }).catch(err => {
        this.createToast('Error while creating comment');
      });
  }

  private deleteComment() {
    const labels = ['Yes', 'No'];

    this.dialogs.confirm('Are you sure you want to delete?', 'Confirmation', labels)
      .then((index) => {
        if (index === 1) {
          this.commentService.deleteComment(this.prevComment.id)
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

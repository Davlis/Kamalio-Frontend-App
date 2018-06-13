import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TablessPage } from '../../+core/components/tabless-page-component';

@Component({
  selector: 'create-post',
  templateUrl: 'create-post.html'
})
export class CreatePostPage extends TablessPage {

  constructor(public navCtrl: NavController) {
    super();
  }
}

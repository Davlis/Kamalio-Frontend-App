import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginService } from '../../+core/services';
import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-most-commented',
  templateUrl: 'most-commented.html'
})
export class MostCommentedPage {

  settingsPage = ProfilePage;

  constructor(public navCtrl: NavController,
              public loginService: LoginService) {
  }
}

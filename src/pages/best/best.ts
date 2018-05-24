import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginService } from '../../+core/services';
import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-best',
  templateUrl: 'best.html'
})
export class BestPage {

  settingsPage = ProfilePage;

  constructor(public navCtrl: NavController,
              public loginService: LoginService) {
  }
}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginService } from '../../+core/services';
import { TablessPage } from '../../+core/components/tabless-page-component';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage extends TablessPage {

  constructor(public navCtrl: NavController,
              public loginService: LoginService) {
    super();
  }
}

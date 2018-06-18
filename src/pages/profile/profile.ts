import { Component } from '@angular/core';
import { LoginService } from '../../+core/services';
import { TablessPage } from '../../+core/components/tabless-page-component';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage extends TablessPage {

  constructor(public loginService: LoginService) {
    super();
  }
}

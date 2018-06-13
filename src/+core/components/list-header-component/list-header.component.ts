import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginService } from '../../services';
import { ProfilePage } from '../../../pages/profile/profile';

@Component({
  selector: 'list-header',
  templateUrl: 'list-header.component.html'
})
export class ListHeaderComponent {

  profilePage = ProfilePage;

  constructor(public loginService: LoginService) {
  }
}

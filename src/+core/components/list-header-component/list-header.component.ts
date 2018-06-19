import { Component, Input } from '@angular/core';
import { LoginService } from '../../services';
import { ProfilePage } from '../../../pages/profile';

@Component({
  selector: 'list-header',
  templateUrl: 'list-header.component.html'
})
export class ListHeaderComponent {

  @Input() public refreshFunction: Function;
  profilePage = ProfilePage;

  constructor(public loginService: LoginService) {
  }
}

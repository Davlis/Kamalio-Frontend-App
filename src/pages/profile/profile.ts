import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  private tabBarElement: any;

  constructor(public navCtrl: NavController) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  public ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  public ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }
}

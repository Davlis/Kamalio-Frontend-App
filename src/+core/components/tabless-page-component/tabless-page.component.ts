import { Component, Input } from '@angular/core';

export abstract class TablessPage {

  protected tabBarElement: any;
  protected fabElement: any;

  constructor() {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.fabElement = document.querySelector('ion-fab');
  }
  
  public ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
    this.fabElement.style.display = 'none';
  }

  public ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
    this.fabElement.style.display = 'block';
  }
}

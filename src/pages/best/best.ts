import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Subscription } from 'rxjs';
import { GeolocationService } from '../../+core/services';
import { GeolocationResultModel } from '../../+core/models';

@Component({
  selector: 'page-best',
  templateUrl: 'best.html'
})
export class BestPage implements OnInit, OnDestroy {

  public result: GeolocationResultModel;

  private geolocationSubsciption: Subscription;

  constructor(public navCtrl: NavController,
              public geolocationService: GeolocationService) {
  }

  public ngOnInit() {
    this.geolocationSubsciption = this.geolocationService.resultSubject.subscribe(next => {
      this.result = next;
    });
  }

  public ngOnDestroy() {
    if (this.geolocationSubsciption) {
      this.geolocationSubsciption.unsubscribe();
    }
  }
}

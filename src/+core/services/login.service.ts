import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { GeolocationService } from './geolocation.service';
import { GeolocationResultModel } from '../models';

@Injectable()
export class LoginService {

  public result: GeolocationResultModel;
  private geolocationSubsciption: Subscription;

  constructor(private geolocationService: GeolocationService) {

    this.init();
  }

  private init() {
    this.geolocationService.resultSubject.subscribe(next => {
      this.result = next;
    });
  }

  public isLocation(): boolean {
    return !!this.result;
  }

  public get(thing: string, forHeader: boolean = false): string | null {
    if (this.result && this.result[thing]) {
      let value = this.result[thing];
      value += forHeader ? ' -' : '';

      return value;
    } else {
      return '';
    }
  }
}

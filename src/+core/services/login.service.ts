import { Injectable, Inject } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { Subscription } from 'rxjs';
import { GeolocationService } from './geolocation.service';
import { DataService } from './data.service';
import { TokenService } from './token.service';
import { GeolocationResultModel, User } from '../models';
import { EnvVariables } from '../../environment';

@Injectable()
export class LoginService {

  public result: GeolocationResultModel;
  private geolocationSubsciption: Subscription;

  public user: User;
  public karma: number;

  constructor(private platform: Platform,
              private geolocationService: GeolocationService,
              private device: Device,
              @Inject(EnvVariables) private env,
              private dataService: DataService,
              private tokenService: TokenService) {

    this.init();
  }

  public ready() {
    return new Promise(resolve => {
      const timeout = () => {
        setTimeout(() => {
          if (this.result) {
            resolve();
          } else {
            timeout();
          }
        }, 100);
      };

      timeout();
    });
  }

  private async init() {
    await this.logIn();

    this.geolocationService.resultSubject.subscribe(next => {
      this.result = next;
    });
  }

  private async logIn() {
    let deviceId, platform;

    if (this.device.uuid) {
      deviceId = this.device.uuid;
      platform = this.platform.is('ios') ? 'ios' : 'android';
    } else if (this.env.ionicEnvName === 'dev') {
      deviceId = this.env.uuid;
      platform = this.env.platform;
    } else {
      throw new Error('Invalid device uuid in prod enviroment');
    }

    this.tryLogIn(deviceId, platform);
  }

  public isLocation(): boolean {
    return !!this.result;
  }

  public get(thing: string, forHeader: boolean = false): string | null {
    if (this.result && this.result[thing]) {
      let value = this.result[thing];
      value += forHeader ? ' - ' : '';

      return value;
    } else {
      return '';
    }
  }

  private async tryLogIn(deviceId, platform) {
    this.dataService.postData('auth/verify', {
      deviceId,
      platform
    }).then(result  => {
      this.user = result.user;
      this.tokenService.accessToken = result.token.accessToken;
      this.tokenService.refreshToken = result.token.refreshToken;
      return this.getKarma();
    }).catch(async err => {
      setTimeout(async () => {
        await this.tryLogIn(deviceId, platform);
      }, 2500);
    });
  };

  private async getKarma() {
    this.dataService.getData('users/karma')
      .then(result => {
        this.karma = result.value;
        return Promise.resolve();
      }).catch(async err => {
        setTimeout(async () => {
          await this.getKarma();
        }, 2500);
      });
  }
}

import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { Platform } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs';
import { GeolocationResultModel } from '../models';

@Injectable()
export class GeolocationService {

  public resultSubject: BehaviorSubject<GeolocationResultModel> = new BehaviorSubject(null);

  private lon: number = 0;
  private lat: number = 0;
  private reverseResult: any;

  constructor(private geolocation: Geolocation,
              private nativeGeocoder: NativeGeocoder,
              private platform: Platform) {

    this.platform.ready()
      .then(() => this.init())
      .catch(err => console.error(err));
  }

  private init() {

    let watch = this.geolocation.watchPosition()
      .filter((p) => p.coords !== undefined);

    watch.subscribe((data) => {

      this.lon = data.coords.longitude;
      this.lat = data.coords.latitude;

      if (!(this.platform.is('ios') || this.platform.is('android'))) { // browser

        this.reverseResult = {
          countryCode: 'TE',
          countryName: 'Test Country',
          postalCode: '00-000',
          administrativeArea: 'Test Administrative Area',
          subAdministrativeArea: 'Test SubAdministrative Area',
          locality: 'Test Locality',
          subLocality: 'Test SubLocality',
          thoroughfare: 'Test Thoroughfare',
          subThoroughfare: 'Test SubThoroughfare'
        };

        this.nextValue();

      } else {

        this.nativeGeocoder.reverseGeocode(this.lat, this.lon)
          .then((result: NativeGeocoderReverseResult) => {

            if (result[0]) {
              this.reverseResult = result[0];
            } else {
              this.reverseResult = result;
            }

            this.nextValue();

          }).catch(err => {

            console.error(err);
            this.reverseResult = null
            this.nextValue();
          });
      }
    }, (err) => {
        console.error(err);
        this.reverseResult = null;
        this.nextValue();
    });
  }

  public getReverseLocation() {
    if (this.reverseResult) {
      const value = {...this.reverseResult} as GeolocationResultModel;
      value.lat = parseFloat(this.lat.toFixed(4));
      value.lon = parseFloat(this.lon.toFixed(4));

      return value;
    } else {
      return null;
    }
  }

  public getLocation() {
    if (this.lat && this.lon) {
      return {
        lat: this.lat,
        lon: this.lon
      };
    } else {
      return null;
    }
  }

  private nextValue() {
    const value = this.getReverseLocation();
    this.resultSubject.next(value);
  }
}

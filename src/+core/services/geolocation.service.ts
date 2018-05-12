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
      .then(readySource => this.init(readySource))
      .catch(err => console.error(err));
  }

  private init(readySource: string) {

    let watch = this.geolocation.watchPosition()
      .filter((p) => p.coords !== undefined);

    watch.subscribe((data) => {

      this.lon = data.coords.longitude;
      this.lat = data.coords.latitude;

      if (readySource === 'dom') { // browser

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

  private nextValue() {
    if (this.reverseResult) {
      const value = {...this.reverseResult} as GeolocationResultModel;
      value.lat = parseFloat(this.lat.toFixed(4));
      value.lon = parseFloat(this.lon.toFixed(4));

      this.resultSubject.next(value);
    } else {
      this.resultSubject.next(null);
    }
  }
}

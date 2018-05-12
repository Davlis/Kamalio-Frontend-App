import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { Platform } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs';
import { GeolocationResultModel } from '../models';

@Injectable()
export class GeolocationService {

  public resultSubject: BehaviorSubject<GeolocationResultModel> = new BehaviorSubject(null);

  private lon: number;
  private lat: number;
  private reverseResult: any;

  constructor(private geolocation: Geolocation,
              private nativeGeocoder: NativeGeocoder,
              private platform: Platform) {

    this.init();
  }

  private init() {

    let watch = this.geolocation.watchPosition();

    watch.subscribe((data) => {
      if (data && data.coords) {

        this.lon = parseFloat(data.coords.longitude.toFixed(4));
        this.lat = parseFloat(data.coords.latitude.toFixed(4));

        if (this.platform.is('core')) {

          this.reverseResult = {
            countryName: 'Test Country',
            administrativeArea: 'Test Administrative Area',
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

            }).catch((error: any) => {

              console.error(error);

              this.reverseResult = null;
              this.nextValue();
            });
        }
      }
    });
  }

  private nextValue() {
    if (this.reverseResult) {
      const value = {...this.reverseResult} as GeolocationResultModel;
      value.lat = this.lat;
      value.lon = this.lon;

      this.resultSubject.next(value);
    } else {
      this.resultSubject.next(null);
    }
  }
}

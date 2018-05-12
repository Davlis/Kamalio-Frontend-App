import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';

@Component({
  selector: 'page-best',
  templateUrl: 'best.html'
})
export class BestPage {

  lon: number = 0.0;
  lat: number = 0.0;
  reverseResult: any;

  constructor(public navCtrl: NavController,
              public geolocation: Geolocation,
              public nativeGeocoder: NativeGeocoder) {
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      if (data && data.coords) {
        this.lon = data.coords.longitude;
        this.lat = data.coords.latitude;
        this.nativeGeocoder.reverseGeocode(this.lat, this.lon)
          .then((result: NativeGeocoderReverseResult) => {
            if (result[0]) {
              this.reverseResult = result[0];
            } else {
              this.reverseResult = result;
            }
          }).catch((error: any) => {
            this.reverseResult = null;
            console.error(error);
          });
      }
    });
  }
}

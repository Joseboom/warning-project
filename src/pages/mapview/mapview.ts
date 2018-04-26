import { GoogleMap, LatLng, GoogleMaps, GoogleMapsEvent } from '@ionic-native/google-maps';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MapviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mapview',
  templateUrl: 'mapview.html',
})
export class MapviewPage {
  @ViewChild('map3') map3Element: ElementRef
  map: GoogleMap
  location: LatLng
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public googleMaps: GoogleMaps
  ) {
    let data = window.localStorage.getItem('report') ? JSON.parse(window.localStorage.getItem('report')) : {};
    this.location = new LatLng(data.location.lat, data.location.lng);
    setTimeout(() => {
      let ele = this.map3Element.nativeElement;
      this.map = this.googleMaps.create(ele, {
        controls: {
          compass: true,
          myLocationButton: true,
          indoorPicker: true,
          zoom: true,
        },
        gestures: {
          scroll: true,
          tilt: true,
          rotate: true,
          zoom: true
        },
        camera: {
          bearing: 0,
          tilt: 0,
          zoom: 16,
          target: this.location
        }
      });
      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        this.map.addMarker({
          title: 'Ionic',
          icon: 'blue',
          animation: 'DROP',
          position: this.location
        })
          .then(marker => {
            // marker.on(GoogleMapsEvent.MARKER_CLICK)
            //   .subscribe(() => {
            //     alert('clicked');
            //   });
          });
      });
    }, 1000);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapviewPage');
  }

}

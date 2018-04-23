import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleMaps, GoogleMap, LatLng, GoogleMapsEvent } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  cookingData: any = {
    usercontact: {
      _id: '',
      firstName: '',
      lastName: '',
      tel: ''
    },
    detail: '',
    location: {
      lat: '',
      lng: ''
    },
    images: ['url']
  };
  @ViewChild('map') mapElement: ElementRef;
  private map: GoogleMap;
  private location: LatLng;
  constructor(public navCtrl: NavController, public navParams: NavParams, private googleMaps: GoogleMaps, private geolocation: Geolocation) {
  }

  ionViewWillEnter() {
    this.cookingData = window.localStorage.getItem('report') ? JSON.parse(window.localStorage.getItem('report')) : {};
    console.log('ionViewDidLoad MapPage');
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.cookingData.location = { lat: resp.coords.latitude, lng: resp.coords.longitude };
      this.location = new LatLng(resp.coords.latitude, resp.coords.longitude);
      this.initialMap();
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  open1() {
    // this.cookingData.location = { lat: '100', lng: '200' };
    window.localStorage.setItem('report', JSON.stringify(this.cookingData));
    this.navCtrl.push("ReportPage");

  }
  cancel() {
    this.navCtrl.pop();

  }

  initialMap() {
    let element = this.mapElement.nativeElement;
    this.map = this.googleMaps.create(element, {
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
  }
}

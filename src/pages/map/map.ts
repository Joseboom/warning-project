import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
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
      lat: 0,
      lng: 0
    },
    images: ['url']
  };
  private map: GoogleMap;
  private location: LatLng;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private googleMaps: GoogleMaps,
    private geolocation: Geolocation,
    public platform: Platform
  ) {
  }

  ionViewWillEnter() {
    this.platform.ready().then(() => {
      this.cookingData = window.localStorage.getItem('report') ? JSON.parse(window.localStorage.getItem('report')) : {};
      console.log('ionViewDidLoad MapPage');
      this.geolocation.getCurrentPosition().then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude
        this.cookingData.location = { lat: resp.coords.latitude, lng: resp.coords.longitude };
      }).catch((error) => {
        console.log('Error getting location', error);
      });
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
}

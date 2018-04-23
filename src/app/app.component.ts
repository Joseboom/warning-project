import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = "IntoPage";

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.configFirebase();
    });
  }
  configFirebase() {
    let config = {
      apiKey: "AIzaSyBfVXHFPiFYZzuCIm4d-kljUg4gk_8nebY",
      authDomain: "worning-f10a5.firebaseapp.com",
      databaseURL: "https://worning-f10a5.firebaseio.com",
      projectId: "worning-f10a5",
      storageBucket: "worning-f10a5.appspot.com",
      messagingSenderId: "70353598780"
    };
    firebase.initializeApp(config);
  }
}


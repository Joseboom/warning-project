import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

/**
 * Generated class for the IntoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-into',
  templateUrl: 'into.html',
})
export class IntoPage {
  alert: any;
 
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public appCtrl: App
  ) {
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad IntoPage');
  }
  openPage1() {
    this.appCtrl.getRootNav().setRoot('TabnavPage');
            }
  openPage2() {
    this.navCtrl.push("HomereceivePage");

  }
}

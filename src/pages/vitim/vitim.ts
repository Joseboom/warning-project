import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VitimPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vitim',
  templateUrl: 'vitim.html',
})
export class VitimPage {
  user: any = {
    firstName: '',
    lastName: '',
    tel: null
  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : {};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VitimPage');

  }
  openPage() {
    window.localStorage.setItem('user', JSON.stringify(this.user));
    this.navCtrl.push("DetailwarningPage");
  }

  cancel() {
    this.navCtrl.pop();
  }

}

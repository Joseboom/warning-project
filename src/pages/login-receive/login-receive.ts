import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LoginReceivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-receive',
  templateUrl: 'login-receive.html',
})
export class LoginReceivePage {
  user: any = {
    firstName: '',
    lastName: '',
    tel: null
  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : {};
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginReceivePage');
  }
  openPage() {
    window.localStorage.setItem('user', JSON.stringify(this.user));
    this.navCtrl.push("ReceiveMPage");
  }

  cancel() {
    this.navCtrl.pop();
  }
}

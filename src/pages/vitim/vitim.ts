import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthenProvider } from '../../providers/authen/authen';

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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authenService: AuthenProvider,
    public loadding: LoadingController
  ) {
    this.user = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : {};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VitimPage');

  }
  login() {
    let loading = this.loadding.create();
    loading.present();
    this.authenService.login(this.user).then((data) => {
      loading.dismiss();
      window.localStorage.setItem('user', JSON.stringify(data));
      this.navCtrl.push("DetailwarningPage");
    }, (err) => {
      this.authenService.userSignup(this.user).then((data) => {
        loading.dismiss();
        window.localStorage.setItem('user', JSON.stringify(data));
        this.navCtrl.push("DetailwarningPage");
      }, (err) => {
        loading.dismiss();
        alert('เกิดข้อผิดพลาด กรุณาตรวจข้อมูลอีกครั้ง');
      });
    });
  }

  cancel() {
    this.navCtrl.pop();
  }

}

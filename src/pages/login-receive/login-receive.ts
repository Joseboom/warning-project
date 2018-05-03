import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthenProvider } from '../../providers/authen/authen';

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
    tel: ''
  }
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authenService: AuthenProvider,
    public loadding: LoadingController
  ) {
    this.user = window.localStorage.getItem('userReceive') ? JSON.parse(window.localStorage.getItem('userReceive')) : {};
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginReceivePage');
  }
  openPage() {
    window.localStorage.setItem('user', JSON.stringify(this.user));
    this.navCtrl.push("ReceiveMPage");
  }

  login() {
    let loading = this.loadding.create();
    loading.present();
    this.authenService.login(this.user).then((data) => {
      loading.dismiss();
      this.navCtrl.push("ReceiveMPage");
    }, (err) => {
      this.authenService.receiveSignup(this.user).then((data) => {
        loading.dismiss();
        this.navCtrl.push("ReceiveMPage");
      }, (err) => {
        loading.dismiss();
        alert('เกิดข้อผิดพลาด กรุณาตรวจข้อมูลอีกครั้ง');
      });
    });
  }
  
  cancel() {
    this.navCtrl.push("HomereceivePage");
  }
}

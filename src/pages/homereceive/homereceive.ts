import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,App } from 'ionic-angular';

/**
 * Generated class for the HomereceivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-homereceive',
  templateUrl: 'homereceive.html',
})
export class HomereceivePage {

  constructor(
    public navCtrl: NavController,
    public alert: AlertController, 
    public navParams: NavParams,
    public appCtrl: App
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomereceivePage');
  }
  openPage() {
    this.navCtrl.push("LoginReceivePage");
  }
  logout()
          {
            let alert = this.alert.create({
          title: 'ออกจากระบบ!',
          message: 'คุณต้องการออกจากระบบ ใช่ หรือ ไม่ !',
          buttons: [  {
            text: 'ไม่ใช่',
            handler: () => {
              // console.log('Buy clicked');
            }
          },{
              text: 'ใช่',
              handler: () => {
                this.appCtrl.getRootNav().setRoot("IntoPage");
              }
            }
            ]
        });
        alert.present()
      }
}

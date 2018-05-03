import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,App } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  button = [
    { name: 'b1' }
    , { name: 'b2' }

  ]

  constructor(
    public alert: AlertController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public appCtrl: App
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  openPage() {
    this.navCtrl.push("VitimPage");

  }
  openPage2() {
    this.navCtrl.push("ContactphPage");

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


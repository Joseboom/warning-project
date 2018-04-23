import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

/**
 * Generated class for the DetailwarningPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detailwarning',
  templateUrl: 'detailwarning.html',
})
export class DetailwarningPage {
  listwarning: Array<any> = [{ detail: 'รถชน' }, { detail: 'รถล้ม' }, { detail: 'ไฟไหม้' }, { detail: 'ผู้ป่วยหนัก' }];
  danger: String;
  other: boolean = false;
  data: string = '';
  isCheck: boolean = false;
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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alert: AlertController
  ) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad DetailwarningPage');
    this.cookingData = window.localStorage.getItem('report') ? JSON.parse(window.localStorage.getItem('report')) : {};
  }

  adddanger() {
    let danger = JSON.parse(JSON.stringify(this.danger));
    this.listwarning.push(danger);
    this.danger = '';
  }
  cancel() {
    this.navCtrl.pop();
  }

  openPage() {
    this.navCtrl.push("ContactmsPage");
  }
  selectItem(item) {
    this.data = item.detail;
    this.cookingData.detail = this.data;
    window.localStorage.setItem('report', JSON.stringify(this.cookingData));
    this.isCheck = true;
    console.log(this.data)
  }
  // ContactmsPage 
  addContact() {
    if (!this.other) {
      this.other = true;
    } else {
      this.other = false;
    }
  }

  delete(item) {
    let alert = this.alert.create({
      title: 'ลบการแจ้งเตือน',
      message: 'คุณต้องการลบ ' + item + ' ใช่หรือไม่?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }
}

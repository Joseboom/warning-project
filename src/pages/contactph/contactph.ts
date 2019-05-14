import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { CallModel } from './contactph.model';
import { ContactphoneProvider } from '../../providers/contactphone/contactphone';

/**
 * Generated class for the ContactphPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contactph',
  templateUrl: 'contactph.html',
})
export class ContactphPage {
  listcontact: Array<any> = [];
  tel: string;
  data: string;
  place2: any = { name: '', tel: '' };
  other: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alert: AlertController,
    public loading: LoadingController,
    public service: ContactphoneProvider
  ) {
    this.getContactPhone();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactphPage');
  }
  checkText() {
    let index = this.listcontact.map(function (e) { return e.tel; }).indexOf(this.place2.tel);
    if (index !== -1)// คำที่พิมพ์มาเคยมีแล้ว ค่าตั้งแต่ 0 ขึ้นไป
    {
      const alert = this.alert.create({
        title: 'คำเตือน!',
        subTitle: 'เบอร์โทรซ้ำ!',
        buttons: ['OK']
      });
      alert.present();     
    } else {
      // ยังไม่ซ้ำ ค่าเท่ากับ -1
      this.creattel();
    }
  }

  creattel() {
    let loading = this.loading.create();
    loading.present();
    this.service.addUser(this.place2).then((data) => {
      loading.dismiss();
      this.place2.name = '';
      this.place2.tel = '';
      this.getContactPhone();
    }, (err) => {
      loading.dismiss();
      console.log(err);
    });
  }
  getContactPhone() {
    let loading = this.loading.create();
    loading.present();
    this.service.getContacts().then((data) => {
      loading.dismiss();
      this.listcontact = data;
    }, (err) => {
      loading.dismiss();
      alert('ผิดพลาด กรุณาเข้าสู่ระบบ');
      console.log(err);
    });
  }

  doSubmit() {
    console.log(this.data);
    window.location.href = 'tel:' + this.data;
  }
  addPlace2() {
    this.checkText();
  }
  cancel() {
    this.navCtrl.push('HomePage');
  }

  changeTel(item) {
    // console.log(item);
    this.tel = item._id;
    this.data = item.tel;
    console.log(this.tel);
  }

  addContact() {
    if (!this.other) {
      this.other = true;
    } else {
      this.other = false;
    }
  }
  delete(item) {
    let alert = this.alert.create({
      title: 'ลบผู้ติดต่อ',
      message: 'คุณต้องการลบ ' + item.name + ' ใช่หรือไม่?',
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
            let loading = this.loading.create();
            loading.present();
            this.service.deleteUser(item).then((data) => {
              loading.dismiss();
              this.getContactPhone();
            }, (err) => {
              loading.dismiss();
              console.log(err);
            });
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }
}

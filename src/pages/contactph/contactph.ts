import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CallModel } from './contactph.model';

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
  listcontact: Array<any> = [
    { _id: '1', usercontact: { firstName: '1669', lastName: '', tel: '1669' } },
    { _id: '2', usercontact: { firstName: 'โรงพยาบาลบีแคร์', lastName: '', tel: '1234' } },
    { _id: '3', usercontact: { firstName: 'โรงพยาบาลภูมิพล', lastName: '', tel: '5678' } },
    { _id: '4', usercontact: { firstName: 'สน.สายบางเขน', lastName: '', tel: '9999' } }
  ];
  tel: string;
  data: string;
  place2: any = { name: '', tel: '' };
  other: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alert: AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactphPage');
  }

  doSubmit() {
    console.log(this.data);
    window.location.href = 'tel:' + this.data;
  }
  addPlace2() {
    let place = JSON.parse(JSON.stringify(this.place2));
    this.listcontact.push(place);
    this.place2.name = '';
    this.place2.tel = '';
  }
  cancel() {
    this.navCtrl.pop();
  }

  changeTel(item) {
    // console.log(item);
    this.tel = item._id;
    this.data = item.usercontact.tel;
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
      message: 'คุณต้องการลบ ' + item.usercontact.firstName + ' ใช่หรือไม่?',
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

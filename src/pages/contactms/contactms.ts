import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

/**
 * Generated class for the ContactmsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contactms',
  templateUrl: 'contactms.html',
})
export class ContactmsPage {
  listcontact: Array<any> = [
    { _id: '1', usercontact: { firstName: '1669', lastName: '', tel: '1669' } },
    { _id: '2', usercontact: { firstName: 'โรงพยาบาลบีแคร์', lastName: '', tel: '1234' } },
    { _id: '3', usercontact: { firstName: 'โรงพยาบาลภูมิพล', lastName: '', tel: '5678' } },
    { _id: '4', usercontact: { firstName: 'สน.สายบางเขน', lastName: '', tel: '9999' } }
  ];
  place: String;
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
    console.log('ionViewDidLoad ContactmsPage');
    this.cookingData = window.localStorage.getItem('report') ? JSON.parse(window.localStorage.getItem('report')) : {};
  }
  addPlace() {
    let place = JSON.parse(JSON.stringify(this.place));
    this.listcontact.push(place);
    this.place = '';
  }
  open1() {
    this.navCtrl.push("MapPage");
  }
  cancel() {
    this.navCtrl.pop();
  }

  selectItem(item) {
    this.data = item._id;
    this.isCheck = true;
    this.cookingData.usercontact = item.usercontact;
    window.localStorage.setItem('report', JSON.stringify(this.cookingData));
    console.log(this.data)
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

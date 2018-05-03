import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { ContactProvider } from '../../providers/contact/contact';

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
  // listcontact: Array<any> = [
  //   { _id: '1', usercontact: { firstName: '1669', lastName: '', tel: '1669' } },
  //   { _id: '2', usercontact: { firstName: 'โรงพยาบาลบีแคร์', lastName: '', tel: '1234' } },
  //   { _id: '3', usercontact: { firstName: 'โรงพยาบาลภูมิพล', lastName: '', tel: '5678' } },
  //   { _id: '4', usercontact: { firstName: 'สน.สายบางเขน', lastName: '', tel: '9999' } }
  // ];
  listcontact: Array<any> = [];
  listFindContact: Array<any> = [];
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
    public alert: AlertController,
    public service: ContactProvider,
    public loading: LoadingController
  ) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad ContactmsPage');
    this.cookingData = window.localStorage.getItem('report') ? JSON.parse(window.localStorage.getItem('report')) : {};
    this.getContact();
  }

  getContact() {
    let loading = this.loading.create();
    loading.present();
    this.service.getContacts().then((data) => {
      loading.dismiss();
      this.listcontact = data;
      this.listFindContact = [];
      this.other = false;
    }, (err) => {
      loading.dismiss();
      console.log(err);
    });
  }
  findUser() {
    // let place = JSON.parse(JSON.stringify(this.place));
    // this.listcontact.push(place);
    let loading = this.loading.create();
    loading.present();
    this.service.findUser(this.place).then((data) => {
      loading.dismiss();
      this.place = '';
      this.listFindContact = data;
    }, (err) => {
      loading.dismiss();
      console.log(err);
    });
  }

  addUser(item) {
    let pos = this.listcontact.map(function (e) { return e.usercontact.tel.toString(); }).indexOf(item.tel.toString());
    // alert(JSON.stringify(pos));
    if (pos === -1) {
      let loading = this.loading.create();
      loading.present();
      this.service.addUser(item).then((data) => {
        loading.dismiss();
        this.getContact();
      }, (err) => {
        loading.dismiss();
        console.log(err);
      });
    } else {
      alert('คุณมีรายชื่อติดต่อแล้ว');
    }

  }
  open1() {
    this.navCtrl.push("MapPage");
  }
  cancel() {
    this.navCtrl.push("DetailwarningPage");  
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
    let alertCtrl = this.alert.create({
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
            let loading = this.loading.create();
            loading.present();
            this.service.deleteUser(item).then((data) => {
              loading.dismiss();
              this.getContact();
            }, (err) => {
              loading.dismiss();
              console.log(err);
              alert('เกิดข้อผิดพลาด กรุณาลบข้อมูลอีกครั้ง');
            });
          }
        }
      ]
    });
    alertCtrl.present();
  }

}

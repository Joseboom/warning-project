import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { DetailwarningProvider } from '../../providers/detailwarning/detailwarning';

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
  // listwarning: Array<any> = [{ detail: 'รถชน' }, { detail: 'รถล้ม' }, { detail: 'ไฟไหม้' }, { detail: 'ผู้ป่วยหนัก' }];
  listwarning: Array<any> = [];
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
  loading: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alert: AlertController,
    public service: DetailwarningProvider,
    public loadding: LoadingController
  ) {

  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad DetailwarningPage');
    this.cookingData = window.localStorage.getItem('report') ? JSON.parse(window.localStorage.getItem('report')) : {};
    this.getWorning();
  }
  // โดนลักทรัพย์
  // อุบัติเหตุจราจร
  // การแข่งมอเตอร์ไซค์บนท้องถนน 
  // ข่มขืน 
  // ปล้นจี้ 
  // ภัยโรคจิต

  getWorning() {
    this.loading = this.loadding.create();
    this.loading.present();
    this.service.getDetails().then((data) => {
      let mockdata = [{
        _id: "โดนลักทรัพย์",
        detail: "โดนลักทรัพย์"
      },
      {
        _id: "อุบัติเหตุจราจร",
        detail: "อุบัติเหตุจราจร"
      },
      {
        _id: "การแข่งมอเตอร์ไซค์บนท้องถนน",
        detail: "การแข่งมอเตอร์ไซค์บนท้องถนน"
      },
      {
        _id: "ข่มขืน",
        detail: "ข่มขืน"
      },
      {
        _id: "ปล้นจี้",
        detail: "ปล้นจี้"
      },
      {
        _id: "ภัยโรคจิต",
        detail: "ภัยโรคจิต"
      }];
      this.listwarning = mockdata.concat(data);
      this.loading.dismiss();
    }, (err) => {
      console.log(err);
      this.loading.dismiss();
    });
  }

  checkText() {
    let index = this.listwarning.map(function (e) { return e.detail; }).indexOf(this.danger);
    if (index !== -1)// คำที่พิมพ์มาเคยมีแล้ว ค่าตั้งแต่ 0 ขึ้นไป
    {
      const alert = this.alert.create({
        title: 'คำเตือน!',
        subTitle: 'ข้อความของท่านซ้ำ!',
        buttons: ['OK']
      });
      alert.present();     
    } else {
      // ยังไม่ซ้ำ ค่าเท่ากับ -1
      this.createDanger();
    }
  }

  adddanger() {
    this.checkText();
  }

  createDanger() {
    this.loading = this.loadding.create();
    this.loading.present();
    this.service.saveDetails(this.danger).then((data) => {
      this.loading.dismiss();
      this.danger = '';
      this.getWorning();
    }, (err) => {
      console.log(err);
    });
  }
  cancel() {
    this.navCtrl.push("VitimPage");
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
    let alertCtrl = this.alert.create({
      title: 'ลบการแจ้งเตือน',
      message: 'คุณต้องการลบ ' + item.detail + ' ใช่หรือไม่?',
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
            this.loading = this.loadding.create();
            this.loading.present();
            this.service.deleteDetails(item).then((data) => {
              this.loading.dismiss();
              this.getWorning();
            }, (err) => {
              this.loading.dismiss();
              alert('กรุณาลองใหม่อีกครั้ง');
            });
          }
        }
      ]
    });
    alertCtrl.present();
  }
}

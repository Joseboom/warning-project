import { Geolocation } from '@ionic-native/geolocation';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ReportProvider } from '../../providers/report/report';
import { SMS } from '@ionic-native/sms';

/**
 * Generated class for the ReceiveReportDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-receive-report-detail',
  templateUrl: 'receive-report-detail.html',
})
export class ReceiveReportDetailPage {
  data: any;
  location: any;
  url = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loading: LoadingController,
    public service: ReportProvider,
    private geolocation: Geolocation,
    private sms: SMS,
    private alertCtrl: AlertController
  ) {
    this.data = this.navParams.data;
    // alert(JSON.stringify(this.data));
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.location = { lat: resp.coords.latitude, lng: resp.coords.longitude };
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    setTimeout(() => {
      this.url = "https://maps.googleapis.com/maps/api/staticmap?center=" + this.data.location.lat + "," + this.data.location.lng + "&zoom=16&size=400x300&scale=2&markers=icon:https://s3-us-west-2.amazonaws.com/ionicthemes-apps-assets/ion2FullApp/pin.min.png|" + this.data.location.lat + "," + this.data.location.lng;
    }, 1000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiveReportDetailPage');
  }
  receive() {
    this.data.status = 'receive';
    this.update();
  }

  sentSms() {
    let alertC = this.alertCtrl.create({
      title: 'กรุณากรอกข้อความ',
      inputs: [
        {
          name: 'message'
        }
      ],
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ส่งข้อความ',
          handler: data => {
            if (data.message) {
              // alert(data.message);
              // alert(this.data.user.tel);
              this.sms.send(this.data.user.tel, data.message);
              alert('ส่งข้อความเรียบร้อยแล้ว');
            }
          }
        }
      ]
    });
    alertC.present();
  }

  success() {
    this.data.status = 'success';
    this.update();
  }

  update() {
    let loading = this.loading.create();
    loading.present();
    this.service.changeStatus(this.data).then((data) => {
      loading.dismiss();
    }, (err) => {
      loading.dismiss();
      console.log(err);
    });
  }

  viewMap() {
    window.open('geo://' + this.location.lat + ',' + this.location.lng + '?q=' + this.data.location.lat + ',' + this.data.location.lng, '_system');
  }

  viewImage() {
    this.navCtrl.push('ViewImagePage', this.data);
  }

}

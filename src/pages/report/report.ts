import { ReportProvider } from './../../providers/report/report';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, ActionSheetController, LoadingController, ModalController } from 'ionic-angular';
import { GoogleMaps, GoogleMap, LatLng, GoogleMapsEvent } from '@ionic-native/google-maps';
import { Camera, CameraOptions, CameraPopoverOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';

/**
 * Generated class for the ReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {
  cookingData: any = {
    usercontact: {
      _id: '',
      firstName: '',
      lastName: '',
      tel: ''
    },
    detail: '',
    location: {
      lat: 0,
      lng: 0
    },
    images: ['url']
  };
  user: any = {
    firstName: '',
    lastName: '',
    tel: null
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alert: AlertController,
    public appCtrl: App,
    private googleMaps: GoogleMaps,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private imagePicker: ImagePicker,
    private loading: LoadingController,
    public service: ReportProvider
  ) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad ReportPage');
    this.cookingData = window.localStorage.getItem('report') ? JSON.parse(window.localStorage.getItem('report')) : {};
    console.log(this.cookingData);
    let imgs = window.localStorage.getItem('imgs') ? JSON.parse(window.localStorage.getItem('imgs')) : [];
    this.cookingData.images = this.cookingData.images ? this.cookingData.images : imgs;
    this.user = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : {};
  }

 

  save() {

    let alert = this.alert.create({
      title: 'ส่งข้อความ',
      message: 'คุณต้องการส่งข้อความนี้ใช่หรือไม่?',
      buttons: [
        {
          text: 'ไม่',
          handler: () => {
            // console.log('Buy clicked');
          }
        }, {
          text: 'ใช่',
          handler: () => {
            // console.log('Buy clicked');
            let loading = this.loading.create();
            loading.present();
            this.service.saveReport(this.cookingData).then((data) => {
              loading.dismiss();
              window.localStorage.removeItem('report');
              this.appCtrl.getRootNav().setRoot('TabnavPage');
            }, (err) => {
              loading.dismiss();
              console.log(err);
            });
          }
        }
      ]
    });
    alert.present();
  }

  viewMap() {
    this.navCtrl.push("MapviewPage");
  }

  viewImage(){
    this.navCtrl.push("ViewImagePage");    
  }
}

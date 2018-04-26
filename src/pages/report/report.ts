import { ReportProvider } from './../../providers/report/report';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, ActionSheetController, LoadingController, ModalController } from 'ionic-angular';
import { GoogleMaps, GoogleMap, LatLng, GoogleMapsEvent } from '@ionic-native/google-maps';
import * as firebase from 'firebase';
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
    this.cookingData.images = this.cookingData.images ? this.cookingData.images : [];
    this.user = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : {};
  }

  selectImage() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Photo Gallery',
          handler: () => {
            this.galleryCamera(1);
          }
        },
        {
          text: 'Camera',
          handler: () => {
            this.openCamera();
          }
        }
      ]
    });
    actionSheet.present();
  }

  openCamera() {
    const popover: CameraPopoverOptions = {
      x: 0,
      y: 32,
      width: 320,
      height: 480,
      arrowDir: this.camera.PopoverArrowDirection.ARROW_ANY
    }
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      popoverOptions: popover,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    let loading = this.loading.create();
    this.camera.getPicture(options).then((imageData) => {
      loading.present();
      this.noResizeImage(imageData).then((data) => {
        this.cookingData.images.push(data);
        loading.dismiss();
      }, (err) => {
        loading.dismiss();
        console.log(err);
      });
    }, (err) => {
      loading.dismiss();
      console.log(err);
    });
  }
  galleryCamera(maxImg) {
    const options = {
      maximumImagesCount: maxImg,
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }
    let loading = this.loading.create();
    this.imagePicker.getPictures(options).then((imageData) => {
      loading.present();
      if (Array.isArray(imageData) && imageData.length > 0) {
        for (var i = 0; i < imageData.length; i++) {
          this.noResizeImage(imageData[i]).then((data) => {
            this.cookingData.images.push(data);
            loading.dismiss();
          }, (err) => {
            loading.dismiss();
            console.log(err);
          });
        }
      } else {
        loading.dismiss();
      }
    }, (err) => {
      // alert('err');
      console.log(err);
    });

  }

  noResizeImage(fileUri): Promise<any> {
    return new Promise((resolve, reject) => {
      this.uploadImage(fileUri).then((uploadImageData) => {
        resolve(uploadImageData);
      }, (uploadImageError) => {
        reject(uploadImageError)
      });
    });
  }

  uploadImage(imageString): Promise<any> {
    return new Promise((resolve, reject) => {
      const storageRef = firebase.storage().ref();
      const filename = Math.floor((Date.now() / 1000) + new Date().getUTCMilliseconds());
      let imageRef = storageRef.child(`images/${filename}.png`);
      let parseUpload: any;
      let metadata = {
        contentType: 'image/png',
      };
      let xhr = new XMLHttpRequest();
      xhr.open('GET', imageString, true);
      xhr.responseType = 'blob';
      xhr.onload = (e) => {
        let blob = new Blob([xhr.response], { type: 'image/png' });
        parseUpload = imageRef.put(blob, metadata);
        parseUpload.on('state_changed', (_snapshot) => {
          let progress = (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (_snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        },
          (_err) => {
            reject(_err);
          },
          (success) => {
            resolve(parseUpload.snapshot.downloadURL);
          });
      }
      xhr.send();
    });
  }

  save() {

    let alert = this.alert.create({
      title: 'ส่งข้อความ',
      message: 'คุณต้องการส่งข้อความนี้ใช่หรือไม่?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // console.log('Buy clicked');
          }
        }, {
          text: 'OK',
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
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { Camera, CameraPopoverOptions, CameraOptions} from '@ionic-native/camera';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ImagePicker } from '@ionic-native/image-picker';

/**
 * Generated class for the ViewImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-image',
  templateUrl: 'view-image.html',
})
export class ViewImagePage {
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
    images: []
  };
  isView = false;
  images: Array<any> = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alert: AlertController, 
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private imagePicker: ImagePicker,
    private loading: LoadingController,
  ) {
    this.cookingData = this.navParams.data ? this.navParams.data : this.cookingData;
    if (this.navParams.data) {
      this.isView = true;
    }
    this.cookingData.images = this.cookingData.images ? this.cookingData.images : [];
    this.images = window.localStorage.getItem('imgs') ? JSON.parse(window.localStorage.getItem('imgs')) : [];
  }

  ionViewWillEnter() {

  }

deleteImg(i){
this.images.splice(i);
this.setStorage();
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
        this.images.push(data);
        this.setStorage();
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
            this.images.push(data);
            this.setStorage();
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

  setStorage() {
    window.localStorage.setItem('imgs', JSON.stringify(this.images));
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
  
}

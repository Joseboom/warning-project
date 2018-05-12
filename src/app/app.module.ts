import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AuthenProvider } from '../providers/authen/authen';
import { HttpClientModule } from '@angular/common/http';
import { Server } from '../providers/server-config/server-config';
import { DetailwarningProvider } from '../providers/detailwarning/detailwarning';
import { ContactProvider } from '../providers/contact/contact';
import { ReportProvider } from '../providers/report/report';
import { ContactphoneProvider } from '../providers/contactphone/contactphone';
import { SMS } from '@ionic-native/sms';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    GoogleMaps,
    Geolocation,
    Camera,
    ImagePicker,
    Base64,
    AuthenProvider,
    Server,
    DetailwarningProvider,
    ContactProvider,
    ReportProvider,
    ContactphoneProvider,
    SMS
  ]
})
export class AppModule { }

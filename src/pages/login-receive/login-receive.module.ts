import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginReceivePage } from './login-receive';

@NgModule({
  declarations: [
    LoginReceivePage,
  ],
  imports: [
    IonicPageModule.forChild(LoginReceivePage),
  ],
})
export class LoginReceivePageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactmsPage } from './contactms';

@NgModule({
  declarations: [
    ContactmsPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactmsPage),
  ],
})
export class ContactmsPageModule {}

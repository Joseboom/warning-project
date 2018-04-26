import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceiveReportDetailPage } from './receive-report-detail';

@NgModule({
  declarations: [
    ReceiveReportDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ReceiveReportDetailPage),
  ],
})
export class ReceiveReportDetailPageModule {}

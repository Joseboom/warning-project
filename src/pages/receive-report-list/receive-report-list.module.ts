import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceiveReportListPage } from './receive-report-list';

@NgModule({
  declarations: [
    ReceiveReportListPage,
  ],
  imports: [
    IonicPageModule.forChild(ReceiveReportListPage),
  ],
})
export class ReceiveReportListPageModule {}

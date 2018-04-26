import { ReportProvider } from '../../providers/report/report';
import { Component } from '@angular/core';
import { LoadingController, IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReceiveReportListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-receive-report-list',
  templateUrl: 'receive-report-list.html',
})
export class ReceiveReportListPage {
  reports: Array<any> = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loading: LoadingController,
    public service: ReportProvider
  ) {
    this.loadReports();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiveReportListPage');
  }

  loadReports() {
    let loading = this.loading.create();
    loading.present();
    this.service.getReports().then((data) => {
      loading.dismiss();
      this.reports = data;
    }, (err) => {
      loading.dismiss();
      console.log(err);
    });
  }
  itemSelected(item) {
    this.navCtrl.push('ReceiveReportDetailPage', item);
  }
}

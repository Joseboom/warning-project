import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Server } from '../server-config/server-config';

/*
  Generated class for the DetailwarningProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DetailwarningProvider {

  constructor(public http: HttpClient, public server: Server) {
    console.log('Hello DetailwarningProvider Provider');
  }

  getDetails(): Promise<any> {
    return this.http.get(this.server.url + 'worningsbyuser')
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  saveDetails(warn): Promise<any> {
    let data = {
      detail: warn
    };
    return this.http.post(this.server.url + 'wornings', data)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  deleteDetails(data): Promise<any> {
    return this.http.delete(this.server.url + 'wornings/' + data._id)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}

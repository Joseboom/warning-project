import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Server } from '../server-config/server-config';

/*
  Generated class for the ContactphoneProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContactphoneProvider {

  constructor(public http: HttpClient, public server: Server) {
    console.log('Hello ContactphoneProvider Provider');
  }

  getContacts(): Promise<any> {
    return this.http.get(this.server.url + 'phonesbyuser')
      .toPromise()
      .then((response) => {
        let res = response as any;
        return res;
      })
      .catch(this.handleError);
  }

  addUser(data): Promise<any> {
    return this.http.post(this.server.url + 'phones', data)
      .toPromise()
      .then((response) => {
        let res = response as any;
        return res;
      })
      .catch(this.handleError);
  }

  deleteUser(data): Promise<any> {
    return this.http.delete(this.server.url + 'phones/' + data._id)
      .toPromise()
      .then((response) => {
        let res = response as any;
        return res;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}

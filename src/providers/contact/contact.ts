import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Server } from '../server-config/server-config';

/*
  Generated class for the ContactProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContactProvider {

  constructor(public http: HttpClient, public server: Server) {
    console.log('Hello ContactProvider Provider');
  }

  getContacts(): Promise<any> {
    return this.http.get(this.server.url + 'contactsbyuser')
      .toPromise()
      .then((response) => {
        let res = response as any;
        return res;
      })
      .catch(this.handleError);
  }

  findUser(data): Promise<any> {
    let user = { tel: data };
    return this.http.post(this.server.url + 'finduserbytel', user)
      .toPromise()
      .then((response) => {
        let res = response as any;
        return res;
      })
      .catch(this.handleError);
  }

  addUser(data): Promise<any> {
    let user = { usercontact: data._id };
    return this.http.post(this.server.url + 'contacts', user)
      .toPromise()
      .then((response) => {
        let res = response as any;
        return res;
      })
      .catch(this.handleError);
  }

  deleteUser(data): Promise<any> {
    return this.http.delete(this.server.url + 'contacts/' + data._id)
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

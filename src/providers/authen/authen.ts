import { Server } from './../server-config/server-config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthenProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenProvider {

  constructor(public http: HttpClient, public server: Server) {
    console.log('Hello AuthenProvider Provider');
  }

  login(credentials): Promise<any> {
    credentials.username = credentials.tel;
    credentials.password = 'Usr#Pass1234';
    return this.http.post(this.server.url + 'auth/signin', credentials)
      .toPromise()
      .then((response) => {
        let res = response as any;
        if (res.roles.indexOf('user') !== -1) {
          window.localStorage.setItem('user', JSON.stringify(res));
        } else {
          window.localStorage.setItem('userReceive', JSON.stringify(res));
        }
        return res;
      })
      .catch(this.handleError);
  }

  userSignup(data): Promise<any> {
    data.username = data.tel;
    data.password = 'Usr#Pass1234';
    data.roles = ['user'];
    return this.http.post(this.server.url + 'auth/signup', data)
      .toPromise()
      .then((response) => {
        let res = response as any;
        window.localStorage.setItem('user', JSON.stringify(res));
        return res;
      })
      .catch(this.handleError);
  }

  receiveSignup(data): Promise<any> {
    data.username = data.tel;
    data.password = 'Usr#Pass1234';
    data.roles = ['admin'];
    return this.http.post(this.server.url + 'auth/signup', data)
      .toPromise()
      .then((response) => {
        let res = response as any;
        window.localStorage.setItem('userReceive', JSON.stringify(res));
        return res;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}

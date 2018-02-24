import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class CoreService{
  constructor(public http: Http){

  }
  getAppConfig(key: string): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.get('assets/data/app.config.json')
        .toPromise()
        .then( response => {
          let appConfig = response.json();
          resolve(appConfig[key]);
        })
        .catch(e => {
          reject(e);
        });
    });
  }
}

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/Rx';

import { CoreUtils } from '../utils/core.utils';

@Injectable()
export class StockService {
    serverPortNumber = environment.serverPort;
    resetUrl = '/stock';
    constructor(public http: Http, public coreUtils: CoreUtils) {
        this.resetUrl = coreUtils.getAppHostName() + ':' + this.serverPortNumber + this.resetUrl;
    }

    filter(term): Promise<any> {
      return new Promise((resolve, reject) => {
        this.http.get(this.resetUrl + '/filter/' + term)
          .toPromise()
          .then( response => {
            let stocks: Array<any> = response.json().results;
            let newStocks: Array<any> = new Array;
            stocks.forEach(item => {
              newStocks.push(item.code + ' ' + item.name);
            });
            resolve(newStocks);
          })
          .catch(e => {
            reject(e);
          });
      });
    }

    showFunds(stock_code: string) {
      return new Promise((resolve, reject) => {
        this.http.get(this.resetUrl + '/funds/' + stock_code)
          .toPromise()
          .then( response => {
            resolve(response.json());
          })
          .catch(e => {
            reject(e);
          });
      });
    }
}

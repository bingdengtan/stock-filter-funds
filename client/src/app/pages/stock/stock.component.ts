import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  title = '股票查询';
  searching = false;
  searchFailed = false;
  optionDescription = '可以查询哪些基金购买了所查询的股票';
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);

  constructor() { }

  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
  }

  search = (text$: Observable<string>) =>
  text$
    .debounceTime(300)
    .distinctUntilChanged()
    .do(() => this.searching = true)
    .switchMap(term => {
      return of(['abc', 'def']);
    })
    .do(() => this.searching = false)
    .merge(this.hideSearchingWhenUnsubscribed)
}

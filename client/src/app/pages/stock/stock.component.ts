import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';

import { GridColumn, GridMenu, GridComponent } from '../../component/grid/grid.component';
import { StockService } from '../../services/stockService';
import { FundStockService } from '../../services/fundStockService';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StockComponent implements OnInit {
  @ViewChild('instance') instance: NgbTypeahead;
  @ViewChild(GridComponent) gridComponent: GridComponent;
  title = '股票查询';
  searching = false;
  searchFailed = false;
  optionDescription = '可以查询哪些基金购买了所查询的股票';
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);

  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  resetUrl = '';
  stock_code = '@';
  term = '';
  gridColumns: any[] = new Array();
  gridActions: any[] = new Array();

  constructor(private stockService: StockService, private fundStockService: FundStockService) { }

  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
    this.initGrid();
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .merge(this.focus$)
      .merge(this.click$.filter(() => !this.instance.isPopupOpen()))
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(term => {
        if (term === '') {
          this.stock_code = '@';
          return of([]);
        } else {
          term = term.indexOf(' ') > -1 ? term.substring(0, term.indexOf(' ')) : term;
          this.stock_code = term;
          return term.length < 2 ? [] : this.stockService.filter(term);
        }
      })
      .do(() => this.searching = false)
      .merge(this.hideSearchingWhenUnsubscribed)

    initGrid(): void {
      this.resetUrl = this.fundStockService.resetUrl + '/funds/' + this.stock_code;
      let nameCol: GridColumn = {title: '股票名称', filedName: 'stock_name', width: '20%', columnFormat: null, display: true,
      click: null,
      sort: {enable: false, sortBy: 'stock_name'}};
      this.gridColumns.push(nameCol);

      nameCol = {title: '基金名称', filedName: 'fund_name', width: '20%', columnFormat: null, display: true,
        click: null,
        sort: {enable: false, sortBy: 'name_ping_yin'}};
      this.gridColumns.push(nameCol);

      nameCol = {title: '基金代码', filedName: 'fund_code', width: '20%', columnFormat: null, display: true,
      click: null,
      sort: {enable: false, sortBy: 'fund_code'}};
      this.gridColumns.push(nameCol);

      nameCol = {title: '持仓季度', filedName: 'month', width: '20%', columnFormat: this.getQuarter, display: true,
        click: null,
        sort: {enable: false, sortBy: 'creation_date'}};
      this.gridColumns.push(nameCol);

      nameCol = {title: '比重（%）', filedName: 'weight', width: '20%', columnFormat: null, display: true,
        click: null,
        sort: {enable: false, sortBy: 'weight'}};
      this.gridColumns.push(nameCol);
    }

    showFunds(): void {
      this.stock_code = this.term.indexOf(' ') > -1 ? this.term.substring(0, this.term.indexOf(' ')) : this.term;
      this.gridComponent.resetUrl = this.fundStockService.resetUrl + '/funds/' + this.stock_code;
      this.gridComponent.loadGrid(1);
    }

    getQuarter(row: any, val: any): String {
      let quarter = '';
      switch (row.month) {
        case 3 : {
          quarter = '1';
          break;
        }
        case 6 : {
          quarter = '2';
          break;
        }
        case 9 : {
          quarter = '3';
          break;
        }
        case 12 : {
          quarter = '4';
          break;
        }
        default : {
          break;
        }
      }
      return  String(row.year) + '第' + quarter + '季';
    }
}

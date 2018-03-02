import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Http, Response} from '@angular/http';
import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

declare var Pace: any;
// declare var jquery: any;
// declare var $: any;

export interface GridColumn {
  display: boolean;
  title: String;
  filedName: String;
  width: String;
  columnFormat: any;  // pass your format function
  click: any; // your clic function for this column, grid component will pass the row value as your function parameter.
  // sort object {enable: boolean, sortBy: string}, if the sortBy is null, then it will use the filed name to sort
  sort: any;
}

export interface GridMenu {
  title: String;
  aClass: String;
  faIcon: String;
  action: any;
  // sub menus: each one shold be {title:String, action: Function}
  subMenus: Array<any>;
}

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})

export class GridComponent implements OnInit {
  @Input() columns: Array<any>;
  @Input() menus: Array<GridMenu>;
  @Input() showIndex: boolean;
  @Input() indexTitle: String = '序号';
  @Input() resetUrl: string;
  @Input() pageSize = 10;
  @Input() pageSizes = [10, 20, 50, 100];
  @Input() sortBy = '';
  @Input() orderBy = 'asc';
  @Input() FTSearch = {show: false, placeholder: '搜索', forNames: []};
  @Input() selection= {show: true, multiple: false};
  @Input() queryObject;

  selectedIds: Array<String> = new Array();
  selectedRows: Array<any> = new Array();
  isSelectedAll = false;
  gridRows: Array<any> = new Array();
  grid: any;
  pager: any = {
    enableFirst: false,
    enableLast: false,
    enablePrevious: false,
    enableNext: false,
    showNextPages: false,
    curPages: []
  };
  pages = 5;

  start = 0; last = 0; total = 0;
  pageInfo: String = '';
  searchTerm: FormControl;
  loading = false;

  constructor(public http: Http) {
    this.searchTerm = new FormControl();
  }

  ngOnInit() {
    console.log('Grid Component Init...');
    this.initSearchTerm();
    this.loadGrid(1);
  }

  getColumnValue(row: any, column: any): string {
    let val = row[column.filedName];
    if (column.columnFormat) {
      val = column.columnFormat(val);
    }
    return val;
  }

  loadGrid(pageNumber: number): void {
    // Pace.restart();
    this.loading = true;
    if (this.grid) {
      if (pageNumber < 1 || pageNumber > this.grid.pageCount) {
        return;
      }
    }

    this.http.post(this.resetUrl, this.getPostData(pageNumber))
      .toPromise()
      .then( response => {
        this.grid = response.json();
        this.gridRows = this.grid.results;
        this.resetPager();
      })
      .catch(e => {
        this.loading = false;
        console.log(e);
      });
  }

  loadMorePages(): void {
    this.loadGrid(Math.ceil(this.grid.pageNumber / this.pages) * this.pages + 1);
  }

  resetPager(): void {
    // uncheck the selected all checkbox
    this.isSelectedAll = false;
    this.selectedIds = [];

    // hiden the loading
    this.loading = false;

    // page information
    if (this.grid.total <= 0) {
      this.start = 0; this.last = 0;
    }else {
      this.start = (this.grid.pageNumber - 1) * this.pageSize + 1;
      this.last = this.grid.pageNumber === this.grid.pageCount ? this.grid.total : this.grid.pageNumber * this.pageSize;
    }
    this.pageInfo = `显示 ${this.start} - ${this.last} 共 ${this.grid.total} 条记录`;

    // set the pager
    // this.grid.pageNumber = 13;

    const curPages: number[] = new Array();
    for (let i = 1; i <= this.pages; i++) {
      const tempPage = (Math.ceil(this.grid.pageNumber / this.pages) - 1) * this.pages + i;
      if (tempPage <= this.grid.pageCount) {
        curPages.push(tempPage);
      }
    }

    this.pager = {
      enableFirst: this.grid.pageNumber > 1,
      enableLast: this.grid.pageNumber < this.grid.pageCount,
      enablePrevious: this.grid.pageNumber > 1,
      enableNext: this.grid.pageNumber < this.grid.pageCount,
      showNextPages: Math.ceil(this.grid.pageNumber / this.pages) * this.pages < this.grid.pageCount,
      curPages: curPages
    };

    // window.setTimeout(() => {
    //   Pace.stop();
    // }, 500);
  }

  getTHClass(th): string {
    let thClass = '';
    if (th.sort.enable) {
      thClass = 'sorting';
      const _sortBy = th.sort.sortBy && th.sort.sortBy !== '' ? th.sort.sortBy : th.filedName;
      if (_sortBy === this.sortBy) {
        thClass = thClass + '_' + (this.orderBy === 'asc' ? 'asc' : 'desc');
      }
    }
    return thClass;
  }

  sortColumn(th): void {
    if (th.sort.enable) {
      const _sortBy = th.sort.sortBy && th.sort.sortBy !== '' ? th.sort.sortBy : th.filedName;
      if (this.sortBy !== _sortBy) {
        this.orderBy = 'asc';
      }else {
        this.orderBy = this.orderBy === 'asc' ? 'desc' : 'asc';
      }
      this.sortBy = _sortBy;
      this.loadGrid(1);
    }
  }

  showColumns(column): void {
    column.display = !column.display;
  }

  changePageSize(size): void {
    this.pageSize = size;
    this.loadGrid(1);
  }

  initSearchTerm(): void {
    this.searchTerm.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap( term => {
        this.loading = true;
        return this.http.post(this.resetUrl, this.getPostData(1));
      })
      .subscribe( response => {
        this.grid = response.json();
        this.gridRows = this.grid.results;
        this.resetPager();
      });
  }

  public getSelectedRows(): any {
    const _selectedRows = [];
    this.gridRows.forEach( row => {
      if (this.selectedIds.indexOf(row['_id']) > -1) {
        _selectedRows.push(row);
      }
    });
    return _selectedRows;
  }

  toggleSelection(row): void {
    this.selectedIds = this.selection.multiple ? this.selectedIds : [];
    const idx = this.selectedIds.indexOf(row['_id']);
    if ( idx > -1) {
      this.selectedIds.splice(idx, 1);
    } else {
      this.selectedIds.push(row['_id']);
    }
    if (this.selectedIds.length > 0 && this.selectedIds.length === this.gridRows.length) {
      this.isSelectedAll = true;
    } else {
      this.isSelectedAll = false;
    }
  }

  toggleSelectAll(): void {
    this.isSelectedAll = !this.isSelectedAll;

    this.selectedIds = [];
    if (this.isSelectedAll) {
      this.gridRows.forEach( row => {
        this.selectedIds.push(row['_id']);
      });
    }
  }

  private getPostData(pageNumber: number): any {
    let query = {};

    if (this.FTSearch.show) {
      if (this.searchTerm.value && this.searchTerm.value !== '') {
        if (this.FTSearch.forNames.length > 0) {
          if (this.FTSearch.forNames.length === 1) {
            query[this.FTSearch.forNames[0]] = {$regex: '.*' + this.searchTerm.value + '.*', $options: 'i'};
          } else {
            const queryFields = [];
            this.FTSearch.forNames.forEach(value => {
              const obj = {};
              obj[value] = {$regex: '.*' + this.searchTerm.value + '.*', $options: 'i'};
              queryFields.push(obj);
            });
            query = {$or: queryFields};
          }
        }
      }
    } else {
      if (this.queryObject) {
        query = this.queryObject;
      }
    }

    return {
      pageNumber: pageNumber,
      pageSize: this.pageSize,
      sortBy: this.sortBy !== '' ? this.sortBy : null,
      orderBy: this.orderBy !== '' ? this.orderBy : null,
      query: query
    };
  }
}

import { Component, OnInit, Input } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @Input() columns: Array<any>;
  @Input() showIndex: boolean;
  @Input() indexTitle: String = '序号';
  @Input() resetUrl: string;
  @Input() pageSize = 10;
  @Input() sortBy = '';
  @Input() orderBy = 'asc';

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

  constructor(public http: Http) { }

  ngOnInit() {
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
    if (this.grid) {
      if (pageNumber < 1 || pageNumber > this.grid.pageCount) {
        return;
      }
    }
    let data = {
      pageNumber: pageNumber,
      pageSize: this.pageSize,
      sortBy: this.sortBy !== '' ? this.sortBy : null,
      orderBy: this.orderBy !== '' ? this.orderBy : null
    };

    this.http.post(this.resetUrl, data)
      .toPromise()
      .then( response => {
        this.grid = response.json();
        this.gridRows = this.grid.results;
        this.resetPager();
      })
      .catch(e => {
        console.log(e);
      });
  }

  loadMorePages(): void {
    this.loadGrid(Math.ceil(this.grid.pageNumber / this.pages) * this.pages + 1);
  }

  resetPager(): void {
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
  }
}

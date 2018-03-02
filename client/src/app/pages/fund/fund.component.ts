import { Component, OnInit, ViewChild } from '@angular/core';

import { FundService } from '../../services/fundService';
import { CoreUtils } from '../../utils/core.utils';
import { GridColumn, GridMenu, GridComponent } from '../../component/grid/grid.component';

@Component({
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.scss']
})
export class FundComponent implements OnInit {
  @ViewChild(GridComponent) gridComponent: GridComponent;
  title = '基金';
  resetUrl = '';
  gridColumns: any[] = new Array();
  gridActions: any[] = new Array();
  funds: any[];

  constructor(public fundService: FundService, public coreUtils: CoreUtils) { }

  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
    this.initGrid();
  }

  menuActionNew(): void {
    console.log(this.gridComponent.getSelectedRows());
  }

  menuActionEdit(): void {
    console.log(this.gridComponent.getSelectedRows());
  }

  menuActionDelete(): void {
    console.log(this.gridComponent.getSelectedRows());
  }

  columnAction(row): void {
    console.log(row);
  }

  initGrid(): void {
    this.resetUrl = this.fundService.resetUrl + '/list';
    let nameCol: GridColumn = {title: '基金名称', filedName: 'name', width: '30%', columnFormat: null, display: true,
      click: this.columnAction.bind(this),
      sort: {enable: true, sortBy: 'name_ping_yin'}};
    this.gridColumns.push(nameCol);

    nameCol = {title: '基金代码', filedName: 'code', width: '30%', columnFormat: null, display: true,
      click: null,
      sort: {enable: true, sortBy: 'code'}};
    this.gridColumns.push(nameCol);

    nameCol = {title: '基金公司', filedName: 'company_name', width: '30%', columnFormat: null, display: true,
      click: this.columnAction.bind(this),
      sort: {enable: false, sortBy: 'company_name'}};
    this.gridColumns.push(nameCol);

    nameCol = {title: '创建时间', filedName: 'creation_date', width: '30%', columnFormat: this.coreUtils.getDateFormat, display: false,
      click: null,
      sort: {enable: true, sortBy: 'creation_date'}};
    this.gridColumns.push(nameCol);

    nameCol = {title: '更新时间', filedName: 'last_updated_date', width: '30%', columnFormat: this.coreUtils.getDateFormat, display: false,
      click: null,
      sort: {enable: true, sortBy: 'last_updated_date'}};
    this.gridColumns.push(nameCol);

    // actions
    //  let gridMenu: GridMenu;
    // gridMenu = {title: 'New', aClass: 'btn-primary', faIcon: 'fa fa-sticky-note-o',
    //   action: this.menuActionNew.bind(this), subMenus: []};
    // this.gridActions.push(gridMenu);

    // gridMenu = {title: 'Edit', aClass: 'btn-info', faIcon: 'fa fa-edit',
    //   action: this.menuActionEdit.bind(this), subMenus: []};
    // this.gridActions.push(gridMenu);

    // gridMenu = {title: 'Delete', aClass: 'btn-danger', faIcon: 'fa fa-trash',
    //   action: this.menuActionDelete.bind(this), subMenus: []};
    // this.gridActions.push(gridMenu);

    // gridMenu = {title: 'More', aClass: 'btn-primary', faIcon: 'fa fa-trash',
    //   action: null, subMenus: [{title: 'More 1', action: this.menuActionDelete}, {title: 'More 2', action: this.menuActionDelete}]};
    // this.gridActions.push(gridMenu);
  }
}

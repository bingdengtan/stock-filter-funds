import { Component, OnInit, ViewChild } from '@angular/core';

import { CompanyService } from '../../services/companyService';
import { CoreUtils } from '../../utils/core.utils';
import { GridColumn, GridMenu, GridComponent } from '../../component/grid/grid.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(GridComponent) gridComponent: GridComponent;
  title = '基金公司';
  resetUrl = '';
  gridColumns: any[] = new Array();
  gridActions: any[] = new Array();
  companies: any[];


  constructor(public companyService: CompanyService, public coreUtils: CoreUtils) { }

  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
    this.initGrid();
    // this.gridColumns.pu
    this.companyService.getCompanies().then(response => {
      this.companies = response.results;
    });
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
    this.resetUrl = this.companyService.resetUrl + '/list';
    let nameCol: GridColumn = {title: '基金公司', filedName: 'name', width: '40%', columnFormat: null, display: true,
      click: this.columnAction.bind(this),
      sort: {enable: true, sortBy: 'name_ping_yin'}};
    this.gridColumns.push(nameCol);

    nameCol = {title: '创建时间', filedName: 'creation_date', width: '30%', columnFormat: this.coreUtils.getDateFormat, display: true,
      click: null,
      sort: {enable: true, sortBy: 'creation_date'}};
    this.gridColumns.push(nameCol);

    nameCol = {title: '更新时间', filedName: 'last_updated_date', width: '30%', columnFormat: this.coreUtils.getDateFormat, display: true,
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

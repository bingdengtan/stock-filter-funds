import { Component, OnInit } from '@angular/core';

import { CompanyService } from '../../services/companyService';
import { GridColumn, CoreUtils } from '../../utils/core.utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = '基金公司';
  resetUrl = '';
  gridColumns: any[] = new Array();
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

  initGrid(): void {
    this.resetUrl = this.companyService.resetUrl + '/list';
    let nameCol: GridColumn = {title: '基金公司', filedName: 'name', width: '40%', columnFormat: null};
    this.gridColumns.push(nameCol);

    nameCol = {title: '创建时间', filedName: 'creation_date', width: '30%', columnFormat: this.coreUtils.getDateFormat};
    this.gridColumns.push(nameCol);

    nameCol = {title: '更新时间', filedName: 'last_updated_date', width: '30%', columnFormat: this.coreUtils.getDateFormat};
    this.gridColumns.push(nameCol);
  }
}

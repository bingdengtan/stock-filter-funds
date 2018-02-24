import { Component, OnInit } from '@angular/core';

import { CoreService } from '../../services/core.service';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  title: string;

  constructor(public coreService: CoreService) { }

  ngOnInit() {
    this.coreService.getAppConfig('app_name').then(response => {
      this.title = response;
    }).catch( e => {
      console.log(e);
    });
  }

}

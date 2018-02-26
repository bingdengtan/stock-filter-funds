import { Component, OnInit } from '@angular/core';

import { CoreService } from '../../services/core.service';

@Component({
  selector: 'app-app-left-side',
  templateUrl: './app-left-side.component.html',
  styleUrls: ['./app-left-side.component.scss']
})
export class AppLeftSideComponent implements OnInit {
  menus: any;
  constructor(public coreService: CoreService) { }

  ngOnInit() {
    this.coreService.getLayoutConfig().then(response => {
      this.menus = response;
    }).catch( e => {
      console.log(e);
    });
  }

}

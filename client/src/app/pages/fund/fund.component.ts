import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.scss']
})
export class FundComponent implements OnInit {
  title = '基金';
  constructor() { }

  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
  }

}

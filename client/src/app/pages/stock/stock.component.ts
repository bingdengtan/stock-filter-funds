import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  title = '股票查询';
  optionDescription = '可以查询哪些基金购买了所查询的股票';
  constructor() { }

  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
  }

}

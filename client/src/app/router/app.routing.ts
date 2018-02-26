import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../pages/home/home.component';
import { FundComponent } from '../pages/fund/fund.component';
import { StockComponent } from '../pages/stock/stock.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'company', pathMatch: 'full' },
      { path: 'company', component: HomeComponent },
      { path: 'fund', component: FundComponent },
      { path: 'stock', component: StockComponent }
    ])
  ],
  declarations: [],
  exports: [RouterModule]
})

export class AppRoutingModule {}

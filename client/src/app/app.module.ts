import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './router/app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AppHeaderComponent } from './component/app-header/app-header.component';
import { AppFooterComponent } from './component/app-footer/app-footer.component';
import { AppLeftSideComponent } from './component/app-left-side/app-left-side.component';
import { AppControlSidebarComponent } from './component/app-control-sidebar/app-control-sidebar.component';

import { CompanyService } from './services/companyService';
import { CoreService } from './services/core.service';
import { CoreUtils } from './utils/core.utils';
import { FundComponent } from './pages/fund/fund.component';
import { StockComponent } from './pages/stock/stock.component';
import { GridComponent } from './component/grid/grid.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppHeaderComponent,
    AppFooterComponent,
    AppLeftSideComponent,
    AppControlSidebarComponent,
    FundComponent,
    StockComponent,
    GridComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    CompanyService,
    CoreService,
    CoreUtils
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

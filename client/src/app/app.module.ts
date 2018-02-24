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

import { CoreService } from './services/core.service'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppHeaderComponent,
    AppFooterComponent,
    AppLeftSideComponent,
    AppControlSidebarComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    CoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

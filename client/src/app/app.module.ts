import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './router/app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AppHeaderComponent } from './component/app-header/app-header.component';
import { AppFooterComponent } from './component/app-footer/app-footer.component';
import { AppLeftSideComponent } from './component/app-left-side/app-left-side.component';
import { AppControlSidebarComponent } from './component/app-control-sidebar/app-control-sidebar.component';


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
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PersonTableComponent } from './component/person-table/person-table.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    AppComponent,
    PersonTableComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    SweetAlert2Module 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

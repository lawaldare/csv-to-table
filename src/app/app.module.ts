import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { RouterModule, Routes } from '@angular/router';
import { StaticComponent } from './static/static.component';
import { DynamicComponent } from './dynamic/dynamic.component';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";



import en from '@angular/common/locales/en';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';




registerLocaleData(en);





const routes: Routes = [
  { path: 'dynamic', component: DynamicComponent },
  { path: 'static', component: StaticComponent },
  { path: '', pathMatch: 'full', redirectTo: 'dynamic' },


];

@NgModule({
  declarations: [
    AppComponent,
    DynamicComponent,
    StaticComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TabsModule.forRoot(),
    RouterModule.forRoot(routes),
    NzTableModule,
    NzDropDownModule,
    BrowserAnimationsModule
  ],
  exports: [RouterModule],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }

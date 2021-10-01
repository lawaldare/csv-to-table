import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { RouterModule, Routes } from '@angular/router';
import { StaticComponent } from './static/static.component';
import { DynamicComponent } from './dynamic/dynamic.component';


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
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

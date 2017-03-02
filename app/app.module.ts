import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import {FormsModule} from "@angular/forms";
import { HttpModule }    from '@angular/http';
import './rxjs-extensions';

import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';

import {AppRoutingModule } from "./app-routing.module";
import {DashboardComponent} from "./dashboard/dashboard.component";
@NgModule({
    imports:      [
        BrowserModule ,
        FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent ,
        DashboardComponent,
    ],
    bootstrap:    [ AppComponent ],
    providers: [
    ],

})
export class AppModule { }

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import {FormsModule} from "@angular/forms";
import { HttpModule }    from '@angular/http';
import './rxjs-extensions';

import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';

// import {AppRoutingModule } from "./app-routing.module";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {UserComponent} from "./user/user.component";
import {RoleComponent} from "./role/role.component";
import {RoleService} from "./role/role.service";
import {UserService} from "./user/user.service";
import {ProjectComponent} from "./project/project.component";
import {ProjectService} from "./project/project.service";
import {Data} from "./data";
import {ModuleComponent} from "./module/module.component";
import {ModuleService} from "./module/module.service";
@NgModule({
    imports:      [
        BrowserModule ,
        FormsModule,
        HttpModule,
        // AppRoutingModule
    ],
    declarations: [
        AppComponent ,
        DashboardComponent,
        UserComponent,
        RoleComponent,
        ProjectComponent,
        ModuleComponent
    ],
    bootstrap:    [ AppComponent ],
    providers: [
        RoleService,
        UserService,
        ProjectService,
        ModuleService,
        Data
    ],

})
export class AppModule {

}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
require("./rxjs-extensions");
// import {AppRoutingModule } from "./app-routing.module";
var dashboard_component_1 = require("./dashboard/dashboard.component");
var user_component_1 = require("./user/user.component");
var role_component_1 = require("./role/role.component");
var role_service_1 = require("./role/role.service");
var user_service_1 = require("./user/user.service");
var project_component_1 = require("./project/project.component");
var project_service_1 = require("./project/project.service");
var data_1 = require("./data");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
        ],
        declarations: [
            app_component_1.AppComponent,
            dashboard_component_1.DashboardComponent,
            user_component_1.UserComponent,
            role_component_1.RoleComponent,
            project_component_1.ProjectComponent
        ],
        bootstrap: [app_component_1.AppComponent],
        providers: [
            role_service_1.RoleService,
            user_service_1.UserService,
            project_service_1.ProjectService,
            data_1.Data
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
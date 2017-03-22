"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var data_1 = require("./data");
var AppComponent = (function () {
    function AppComponent(data) {
        this.data = data;
        this.title = 'MY TASK';
    }
    AppComponent.prototype.ngOnInit = function () {
        this.setSessionUser();
        this.data.initData();
    };
    AppComponent.prototype.goModule = function (module) {
        this.data.current = module;
    };
    AppComponent.prototype.setSessionUser = function () {
        window.sessionStorage.setItem('user', '{"_id":"58b8d5442f7c371239028617","name":"superadmin","password":"superadmin","create_time":"2017-03-03T02:30:28.136Z","create_user":"default","role":"58a50e00542edcf8954ca832","description":"system default user"}');
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        styleUrls: ['app/app.component.css'],
        template: "\n  <h1>{{title}}</h1>\n  <nav>\n    <a *ngFor=\"let module of data.modules\" href=\"#\" (click)=\"goModule(module.value)\">\n    {{module.text}}\n    </a>\n  </nav>\n  <dashboard *ngIf=\"data.current=='dashboard'\"></dashboard>\n  <user *ngIf=\"data.current=='user'\"></user>\n  <!--<role *ngIf=\"current=='role'\"></role>-->\n  <project *ngIf=\"data.current=='project'\"></project>\n  <module *ngIf=\"data.current=='module'\"></module>\n  <intface *ngIf=\"data.current=='intface'\"></intface>\n  <intdata *ngIf=\"data.current=='intdata'\"></intdata>\n",
    }),
    __metadata("design:paramtypes", [data_1.Data])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
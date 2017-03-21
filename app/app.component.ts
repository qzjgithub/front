import {Component, OnInit} from '@angular/core';
import {Data} from "./data";
@Component({
    selector: 'my-app',
    styleUrls: ['app/app.component.css'],
    template: `
  <h1>{{title}}</h1>
  <nav>
    <a *ngFor="let module of data.modules" href="#" (click)="goModule(module.value)">
    {{module.text}}
    </a>
  </nav>
  <dashboard *ngIf="data.current=='dashboard'"></dashboard>
  <user *ngIf="data.current=='user'"></user>
  <!--<role *ngIf="current=='role'"></role>-->
  <project *ngIf="data.current=='project'"></project>
  <module *ngIf="data.current=='module'"></module>
  <intface *ngIf="data.current=='intface'"></intface>
`,
})
export class AppComponent implements OnInit{
    ngOnInit(): void {
        this.setSessionUser();
        this.data.initData();
    }
    title = 'MY TASK';

    constructor(private data:Data){
    }

    goModule(module):void{
        this.data.current = module;
    }

    setSessionUser(){
        window.sessionStorage.setItem('user','{"_id":"58b8d5442f7c371239028617","name":"superadmin","password":"superadmin","create_time":"2017-03-03T02:30:28.136Z","create_user":"default","role":"58a50e00542edcf8954ca832","description":"system default user"}');
    }
}

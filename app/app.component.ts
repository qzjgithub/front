import {Component, OnInit} from '@angular/core';
@Component({
    selector: 'my-app',
    styleUrls: ['app/app.component.css'],
    template: `
  <h1>{{title}}</h1>
  <nav>
    <a *ngFor="let module of modules" href="#" (click)="goModule(module)">
    {{module}}
    </a>
  </nav>
  <dashboard *ngIf="current=='dashboard'"></dashboard>
  <user *ngIf="current=='user'"></user>
  <role *ngIf="current=='role'"></role>
`,
})
export class AppComponent implements OnInit{
    ngOnInit(): void {
        this.setSessionUser();
    }
    title = 'MY TASK';

    modules:string[];
    current:string;

    constructor(){
        this.modules = [
            'dashboard',
            'user',
            'role'
        ]
        this.current = this.modules[0];
    }

    goModule(module):void{
        this.current = module;
    }

    setSessionUser(){
        window.sessionStorage.setItem('user','{"_id":"58b8d5442f7c371239028617","name":"superadmin","password":"superadmin","create_time":"2017-03-03T02:30:28.136Z","create_user":"default","role":"58a50e00542edcf8954ca832","description":"system default user"}');
    }
}

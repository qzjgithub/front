import { Component } from '@angular/core';
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
export class AppComponent {
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
}

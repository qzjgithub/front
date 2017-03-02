import { Component } from '@angular/core';
@Component({
    selector: 'my-app',
    styleUrls: ['app/app.component.css'],
    template: `
  <h1>{{title}}</h1>
  <nav>
    <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
    <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
    <a routerLink="/heroes-form" routerLinkActive="active">Heroes Form</a>
  </nav>
  <router-outlet></router-outlet>
`,
})
export class AppComponent {
    title = 'MY TASK';
}

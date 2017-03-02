import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import {UserComponent} from "./user/user.component";
import {RoleComponent} from "./role/role.component";
const routes: Routes = [
    { path: '', redirectTo: '/front_dashboard', pathMatch: 'full' },
    { path: 'front_dashboard',  component: DashboardComponent },
    { path: 'front_user',  component: UserComponent },
    { path: 'front_role',  component: RoleComponent },
];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
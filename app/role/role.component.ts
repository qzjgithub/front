import {Component, OnInit} from '@angular/core';
import {Role} from "./role";
import {RoleService} from "./role.service";

@Component({
    selector: 'role',
    styleUrls: ['app/role/role.component.css'],
    templateUrl: 'app/role/role.component.html',

})
export class RoleComponent implements OnInit{

    public roles:Role[];

    constructor(
        private roleService: RoleService
    ) {}

    getRoles():void{
        this.roleService.getRoles().then(roles => this.roles = roles);
    }

    ngOnInit(): void {
        this.getRoles();
    }
}


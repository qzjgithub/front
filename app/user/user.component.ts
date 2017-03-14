import {Component, OnInit} from '@angular/core';
import {RoleService} from "../role/role.service";
import {Role} from "../role/role";
import {UserService} from "./user.service";
import {User} from "./user";

@Component({
    selector: 'user',
    styleUrls: ['app/user/user.component.css'],
    templateUrl: 'app/user/user.component.html',

})
export class UserComponent implements OnInit{
    formFlag:Boolean;
    roles:Role[];
    users:User[];
    roleCol:Object;
    userCol:Object;
    logUser:User;
    curUser:User;


    ngOnInit(): void {
        this.getRoles();
        this.getUsers();
    }
    constructor(
        private roleService:RoleService,
        private userService:UserService
    ) {
        this.formFlag = false;
        this.logUser = JSON.parse(window.sessionStorage.getItem('user')) as User;
        this.roleCol = {};
        this.userCol = {};
    }

    getRoles(){
        var that = this;
        this.roleService.getRoles().then(function(roles){
            that.roles = roles;
            that.roles.forEach(function(role){
                that.roleCol[role._id] = role;
            });
        });
    }

    getUsers(){
        var that = this;
        this.userService.getUsers().then(function(users){
            that.users = users;
            that.users.forEach(function(user){
                that.userCol[user._id] = user;
            });
        });
    }

    addUser(user:User): void{
        this.userService.create(user)
            .then(user => {
                if(user['err']){
                    this.formFlag = true;
                }else{
                    this.curUser = user;
                    this.getUsers();
                }
            })
    }

    addClick(): void{
        this.formFlag = true;
        this.curUser = new User('','test1','111',new Date,this.logUser._id,'58a50e20542edcf8954ca834','test1');
    }

    saveClick():void{
        console.log(this.curUser);
        this.curUser.create_time = new Date();
        this.addUser(this.curUser);
    }

    cancelClick():void{
        this.formFlag = false;
    }
}


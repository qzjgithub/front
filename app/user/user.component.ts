import {Component, OnInit} from '@angular/core';
import {RoleService} from "../role/role.service";
import {Role} from "../role/role";
import {UserService} from "./user.service";
import {User} from "./user";
import {Data} from "../data";

@Component({
    selector: 'user',
    styleUrls: ['app/user/user.component.css'],
    templateUrl: 'app/user/user.component.html',

})
export class UserComponent implements OnInit{
    users:User[];
    curUser:User;
    formFlag:Boolean;
    modFlag:Boolean;


    ngOnInit(): void {
        this.getUsers();
    }
    constructor(
        private userService:UserService,
        private data:Data
    ) {
        this.formFlag = false;
        this.modFlag = false;
    }

    getUsers(){
        this.userService.getUsers().then(users => this.users = users);
    }

    addUser(user:User): void{
        this.userService.create(user)
            .then(user => {
                if(user['err']){
                    this.formFlag = true;
                }else{
                    this.curUser = user;
                    this.data.getUsers();
                    this.getUsers();
                    this.formFlag = false;
                }
            })
    }

    addClick(): void{
        this.formFlag = true;
        this.curUser = new User('','test1','111',new Date,this.data.logUser._id,'58a50e20542edcf8954ca834','test1');
    }

    saveClick():void{
        this.curUser.create_time = new Date();
        this.modFlag ? this.updateUser(this.curUser):this.addUser(this.curUser);
    }

    cancelClick():void{
        this.formFlag = false;
        this.modFlag = false;
    }

    deleteUser(id):void{
        this.userService.delete(id)
            .then(user => {
                if(user['err']){
                    alert(user['err']);
                }else{
                    this.data.getUsers();
                    this.getUsers();
                    this.formFlag = false;
                }
            });
    }

    deleteClick(id):void{
        this.deleteUser(id);
    }

    updateUser(user:User):void{
        this.userService.update(user)
            .then(user => {
                if(user['err']){
                    this.formFlag = true;
                }else{
                    this.curUser = user;
                    this.data.getUsers();
                    this.getUsers();
                    this.formFlag = false;
                    this.modFlag = false;
                }
            })
    }

    updateClick(user):void{
        this.curUser = new User(
            user._id,
            user.name,
            user.password,
            user.create_time,
            user.create_user,
            user.role,
            user.description
        );
        console.log(this.curUser);
        this.formFlag = true;
        this.modFlag = true;
    }
}


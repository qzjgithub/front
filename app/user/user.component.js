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
var role_service_1 = require("../role/role.service");
var user_service_1 = require("./user.service");
var user_1 = require("./user");
var UserComponent = (function () {
    function UserComponent(roleService, userService) {
        this.roleService = roleService;
        this.userService = userService;
        this.formFlag = false;
        this.logUser = JSON.parse(window.sessionStorage.getItem('user'));
        this.roleCol = {};
        this.userCol = {};
    }
    UserComponent.prototype.ngOnInit = function () {
        this.getRoles();
        this.getUsers();
    };
    UserComponent.prototype.getRoles = function () {
        var that = this;
        this.roleService.getRoles().then(function (roles) {
            that.roles = roles;
            that.roles.forEach(function (role) {
                that.roleCol[role._id] = role;
            });
        });
    };
    UserComponent.prototype.getUsers = function () {
        var that = this;
        this.userService.getUsers().then(function (users) {
            that.users = users;
            that.users.forEach(function (user) {
                that.userCol[user._id] = user;
            });
        });
    };
    UserComponent.prototype.addUser = function (user) {
        this.userService.create(user);
        /*.then(user => {
            this.curUser = user;
            this.getUsers();
        })*/
    };
    UserComponent.prototype.addClick = function () {
        this.formFlag = true;
        this.curUser = new user_1.User('', 'test1', '111', new Date, this.logUser._id, '', 'test1');
    };
    UserComponent.prototype.saveClick = function () {
        console.log(this.curUser);
        this.curUser.create_time = new Date();
        this.addUser(this.curUser);
        this.formFlag = false;
    };
    UserComponent.prototype.cancelClick = function () {
        this.formFlag = false;
    };
    return UserComponent;
}());
UserComponent = __decorate([
    core_1.Component({
        selector: 'user',
        styleUrls: ['app/user/user.component.css'],
        templateUrl: 'app/user/user.component.html',
    }),
    __metadata("design:paramtypes", [role_service_1.RoleService,
        user_service_1.UserService])
], UserComponent);
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map
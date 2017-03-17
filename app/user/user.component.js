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
var user_service_1 = require("./user.service");
var user_1 = require("./user");
var data_1 = require("../data");
var UserComponent = (function () {
    function UserComponent(userService, data) {
        this.userService = userService;
        this.data = data;
        this.formFlag = false;
        this.modFlag = false;
    }
    UserComponent.prototype.ngOnInit = function () {
        this.getUsers();
    };
    UserComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService.getUsers().then(function (users) { return _this.users = users; });
    };
    UserComponent.prototype.addUser = function (user) {
        var _this = this;
        this.userService.create(user)
            .then(function (user) {
            if (user['err']) {
                _this.formFlag = true;
            }
            else {
                _this.curUser = user;
                _this.data.getUsers();
                _this.getUsers();
                _this.formFlag = false;
            }
        });
    };
    UserComponent.prototype.addClick = function () {
        this.formFlag = true;
        this.curUser = new user_1.User('', 'test1', '111', new Date, this.data.logUser._id, '58a50e20542edcf8954ca834', 'test1');
    };
    UserComponent.prototype.saveClick = function () {
        !this.modFlag && (this.curUser.create_time = new Date());
        this.modFlag ? this.updateUser(this.curUser) : this.addUser(this.curUser);
    };
    UserComponent.prototype.cancelClick = function () {
        this.formFlag = false;
        this.modFlag = false;
    };
    UserComponent.prototype.deleteUser = function (id) {
        var _this = this;
        this.userService.delete(id)
            .then(function (user) {
            if (user['err']) {
                alert(user['err']);
            }
            else {
                _this.data.getUsers();
                _this.getUsers();
                _this.formFlag = false;
            }
        });
    };
    UserComponent.prototype.deleteClick = function (id) {
        this.deleteUser(id);
    };
    UserComponent.prototype.updateUser = function (user) {
        var _this = this;
        this.userService.update(user)
            .then(function (user) {
            if (user['err']) {
                _this.formFlag = true;
            }
            else {
                _this.curUser = user;
                _this.data.getUsers();
                _this.getUsers();
                _this.formFlag = false;
                _this.modFlag = false;
            }
        });
    };
    UserComponent.prototype.updateClick = function (user) {
        this.curUser = new user_1.User(user._id, user.name, user.password, user.create_time, user.create_user, user.role, user.description);
        this.formFlag = true;
        this.modFlag = true;
    };
    return UserComponent;
}());
UserComponent = __decorate([
    core_1.Component({
        selector: 'user',
        styleUrls: ['app/user/user.component.css'],
        templateUrl: 'app/user/user.component.html',
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        data_1.Data])
], UserComponent);
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map
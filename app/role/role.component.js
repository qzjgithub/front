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
var role_service_1 = require("./role.service");
var RoleComponent = (function () {
    function RoleComponent(roleService) {
        this.roleService = roleService;
    }
    RoleComponent.prototype.getRoles = function () {
        var _this = this;
        this.roleService.getRoles().then(function (roles) { return _this.roles = roles; });
    };
    RoleComponent.prototype.ngOnInit = function () {
        this.getRoles();
    };
    return RoleComponent;
}());
RoleComponent = __decorate([
    core_1.Component({
        selector: 'role',
        styleUrls: ['app/role/role.component.css'],
        templateUrl: 'app/role/role.component.html',
    }),
    __metadata("design:paramtypes", [role_service_1.RoleService])
], RoleComponent);
exports.RoleComponent = RoleComponent;
//# sourceMappingURL=role.component.js.map
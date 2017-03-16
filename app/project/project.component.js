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
var project_1 = require("./project");
var project_service_1 = require("./project.service");
var user_service_1 = require("../user/user.service");
var data_1 = require("../data");
var ProjectComponent = (function () {
    function ProjectComponent(projectService, userService, data) {
        this.projectService = projectService;
        this.userService = userService;
        this.data = data;
        this.formFlag = false;
    }
    ProjectComponent.prototype.ngOnInit = function () {
        this.getUsers();
        this.getProjects();
    };
    ProjectComponent.prototype.getProjects = function () {
        var _this = this;
        this.projectService.getProjects().then(function (projects) { return _this.projects = projects; });
    };
    ProjectComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService.getUsers().then(function (users) { return _this.users = users; });
    };
    ProjectComponent.prototype.addProject = function (project) {
        var _this = this;
        this.projectService.create(project)
            .then(function (project) {
            console.log(project);
            if (project['err']) {
                _this.formFlag = true;
            }
            else {
                _this.curProject = project;
                _this.getProjects();
                _this.formFlag = false;
            }
        });
    };
    ProjectComponent.prototype.addClick = function () {
        this.formFlag = true;
        this.curProject = new project_1.Project('', 'test1', new Date, this.data.logUser._id, this.data.logUser._id, '/test1', '8080', '');
    };
    ProjectComponent.prototype.saveClick = function () {
        this.curProject.create_time = new Date();
        this.addProject(this.curProject);
    };
    ProjectComponent.prototype.cancelClick = function () {
        this.formFlag = false;
    };
    return ProjectComponent;
}());
ProjectComponent = __decorate([
    core_1.Component({
        selector: 'project',
        styleUrls: ['app/project/project.component.css'],
        templateUrl: 'app/project/project.component.html',
        host: {}
    }),
    __metadata("design:paramtypes", [project_service_1.ProjectService,
        user_service_1.UserService,
        data_1.Data])
], ProjectComponent);
exports.ProjectComponent = ProjectComponent;
//# sourceMappingURL=project.component.js.map
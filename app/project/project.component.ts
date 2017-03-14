import {Component, OnInit} from "@angular/core";
import {Project} from "./project";
import {ProjectService} from "./project.service";
import {UserService} from "../user/user.service";
import {User} from "../user/user";
@Component({
    selector: 'project',
    styleUrls: ['app/project/project.component.css'],
    templateUrl: 'app/project/project.component.html',
})

export class ProjectComponent implements OnInit{
    projects:Project[];
    users:User[];
    curProject:Project;
    formFlag:boolean;
    logUser:User;

    constructor(
        private projectService:ProjectService,
        private userService:UserService
    ){
        this.formFlag = false;
        this.logUser = JSON.parse(window.sessionStorage.getItem('user')) as User;
    }

    ngOnInit(): void {
        this.getUsers();
        this.getProjects();
    }

    getProjects(){
        this.projectService.getProjects().then(projects => this.projects = projects);
    }

    getUsers(){
        this.userService.getUsers().then(users => this.users = users);
    }

    addProject(project:Project): void{
        this.projectService.create(project)
            .then(project => {
                console.log(project);
                if(project['err']){
                    this.formFlag = true;
                }else{
                    this.curProject = project;
                    this.getProjects();
                    this.formFlag = false;
                }
            })
    }

    addClick(): void{
        this.formFlag = true;
        this.curProject = new Project('','test1',new Date,this.logUser._id,this.logUser._id,'/test1','8080','');
    }

    saveClick():void{
        console.log(this.curProject);
        this.curProject.create_time = new Date();
        this.addProject(this.curProject);
    }

    cancelClick():void{
        this.formFlag = false;
    }
}


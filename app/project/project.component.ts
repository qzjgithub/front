import {Component, OnInit} from "@angular/core";
import {Project} from "./project";
import {ProjectService} from "./project.service";
import {UserService} from "../user/user.service";
import {User} from "../user/user";
import {Data} from "../data";
@Component({
    selector: 'project',
    styleUrls: ['app/project/project.component.css'],
    templateUrl: 'app/project/project.component.html',
    host:{}
})

export class ProjectComponent implements OnInit{
    projects:Project[];
    users:User[];
    curProject:Project;
    formFlag:boolean;

    constructor(
        private projectService:ProjectService,
        private userService:UserService,
        private data:Data
    ){
        this.formFlag = false;
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
        this.curProject = new Project('','test1',new Date,this.data.logUser._id,this.data.logUser._id,'/test1','8080','');
    }

    saveClick():void{
        this.curProject.create_time = new Date();
        this.addProject(this.curProject);
    }

    cancelClick():void{
        this.formFlag = false;
    }
}


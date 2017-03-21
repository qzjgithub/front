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
    modFlag:boolean;

    constructor(
        private projectService:ProjectService,
        private userService:UserService,
        private data:Data
    ){
        this.formFlag = false;
        this.modFlag = false;
    }

    ngOnInit(): void {
        this.getUsers();
        this.getProjects();
    }

    getProjects(){
        this.projectService.getProjects().then(projects => {
            this.projects = []
            projects.forEach(project => {
                this.data.setUserById(project.create_user)
                    .then(u => {
                        this.data.setUserById(project.principal)
                            .then(u => {
                                this.projects.push(project);
                            });
                    });
            });
        });
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
        !this.modFlag && (this.curProject.create_time = new Date());
        this.modFlag? this.updateProject(this.curProject) : this.addProject(this.curProject);
    }

    cancelClick():void{
        this.formFlag = false;
        this.modFlag = false;
    }

    updateProject(project:Project):void{
        this.projectService.update(project)
            .then(project => {
                console.log(project);
                if(project['err']){
                    this.formFlag = true;
                }else{
                    this.curProject = project;
                    this.getProjects();
                    this.formFlag = false;
                    this.modFlag = false;
                }
            })
    }

    updateClick(project):void{
        this.curProject = new Project(
            project._id,
            project.name,
            project.create_time,
            project.create_user,
            project.principal,
            project.path,
            project.port,
            project.description
        );
        this.formFlag = true;
        this.modFlag = true;
    }

    deleteProject(id):void{
        this.projectService.delete(id)
            .then(project => {
                if(project['err']){
                    alert(project['err']);
                }else{
                    this.getProjects();
                    this.formFlag = false;
                }
            });
    }

    deleteClick(id):void{
        this.deleteProject(id);
    }

    detailClick(project):void{
        this.data.current = "module";
        this.data.curProject = project;
        this.data.setProject(this.data.curProject);
    }

    intfaceClick(project):void{
        this.data.current = "intface";
        this.data.intfrom = true;
        this.data.curProject = project;
        this.data.setProject(this.data.curProject);
    }
}


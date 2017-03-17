import {Injectable} from "@angular/core";
import {ProjectService} from "./project/project.service";
import {UserService} from "./user/user.service";
import {User} from "./user/user";
import {Project} from "./project/project";
import {RoleService} from "./role/role.service";
import {Role} from "./role/role";
/**
 * Created by a0027 on 2017/3/14.
 */
@Injectable()
export class Data{

    modules:Object[];
    current:string;
    roles:Map<string,Role>;
    users:Map<string,User>;
    projects:Map<string,Project>;
    logUser:User;
    curProject:Project;


    constructor(
        private projectService:ProjectService,
        private userService:UserService,
        private roleService:RoleService
    ){

        this.modules = [
            {value:'dashboard',text:'主页'},
            {value:'user',text:'用户'},
            /*{value:'role',text:'角色'},*/
            {value:'project',text:'项目'}
        ];
        this.current = this.modules[0]['value'];
        this.roles = new Map<string,Role>();
        this.users = new Map<string,User>();
        this.projects = new Map<string,Project>();
        this.logUser = JSON.parse(window.sessionStorage.getItem('user')) as User;
        this.curProject = new Project('','',new Date(),'','','','','');
    }

    getRoles(){
        this.roleService.getRoles().then(datas =>{
            datas.forEach(data => this.roles.set(data._id,data));
        });
    }

    getUsers(){
        this.userService.getUsers().then(datas => {
            datas.forEach(data => this.users.set(data._id,data));
        });
    }

    getProjects(){
        this.projectService.getProjects().then(datas =>{
            datas.forEach(data => this.projects.set(data._id,data));
        });
    }

    initData(){
        this.getRoles();
        this.getUsers();
    }

    getValue(datas,key,name){
        return this.getColumn(datas,key)[name];
    }

    getColumn(datas,key){
        return this[datas].get(key);
    }

    getData(datas){
        var arr = [];
        this[datas].forEach((item,key,map) => arr.push(item));
        return arr;
    }
}
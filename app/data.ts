import {Injectable} from "@angular/core";
import {ProjectService} from "./project/project.service";
import {UserService} from "./user/user.service";
import {User} from "./user/user";
import {Project} from "./project/project";
import {RoleService} from "./role/role.service";
import {Role} from "./role/role";
import {Module} from "./module/module";
import {ModuleService} from "./module/module.service";
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
    moduls:Map<string,Module>;
    logUser:User;
    curProject:Project;
    curModul:Module;
    intfrom:boolean;


    constructor(
        private modulService:ModuleService,
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
        this.moduls = new Map<string,Module>();
        this.logUser = JSON.parse(window.sessionStorage.getItem('user')) as User;
        this.curProject = new Project('','',new Date(),'','','','','');
        this.curModul = new Module('','',new Date(),'','','','','');
        this.intfrom = true;
    }

    setUserById(id):Promise<User>{
        var u = this.users.get(id);
        if(id=='default'||u){
            return new Promise<User>(resolve => resolve.call(this)).then(() => u);
        }else{
            return this.userService.getUserById(id)
                .then(u => {
                    this.setUser(u);
                    return u;
                });
        }
    }

    setUser(user):void{
        this.users.set(user._id,user);
    }

    setProjectById(id):Promise<Project>{
        var u = this.projects.get(id);
        if(u){
            return new Promise<Project>(resolve => resolve.call(this)).then(() => u);
        }else{
            return this.projectService.getProjectById(id)
                .then(u => {
                    this.setProject(u);
                    return u;
                });
        }
    }

    setProject(project):void{
        this.projects.set(project._id,project);
    }

    setModulById(id):Promise<Module>{
        var u = this.moduls.get(id);
        if(id=='default'||u){
            return new Promise<User>(resolve => resolve.call(this)).then(() => u);
        }else{
            return this.modulService.getModulById(id)
                .then(u => {
                    this.setUser(u);
                    return u;
                });
        }
    }

    setModule(modul):void{
        this.moduls.set(modul._id,modul);
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
        // this.getUsers();
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
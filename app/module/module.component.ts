import {Component, OnInit, Input} from '@angular/core';
import {Data} from "../data";
import {ModuleService} from "./module.service";
import {Module} from "./module";
import {User} from "../user/user";
import {UserService} from "../user/user.service";

@Component({
    moduleId: module.id,
    selector: 'module',
    // styleUrls: ['app/role/role.component.css'],
    templateUrl: '/app/module/module.component.html',

})
export class ModuleComponent implements OnInit{

    users:User[];
    modules:Module[];
    curModule:Module;
    formFlag:boolean;
    modFlag:boolean;

    constructor(
        private userService:UserService,
        private moduleService:ModuleService,
        private data:Data
    ) {}

    ngOnInit(): void {
        this.getUsers();
        this.getModulesByProjectId();
        this.formFlag = false;
        this.modFlag = false;
    }

    getUsers():void{
        this.userService.getUsers()
            .then(users => this.users = users);
    }

    getModulesByProjectId():void{
        this.moduleService.getModulesByProjectId(this.data.curProject._id)
            .then(modules => {
                this.modules = []
                modules.forEach(module => {
                    this.data.setUserById(module.create_user)
                        .then(u => {
                            this.data.setUserById(module.principal)
                                .then(u => {
                                    this.modules.push(module);
                                });
                        });
                });
            });
    }

    addModule(module:Module): void{
        this.moduleService.create(module)
            .then(module => {
                if(module['err']){
                    this.formFlag = true;
                }else{
                    this.curModule = module;
                    this.getModulesByProjectId();
                    this.formFlag = false;
                }
            })
    }

    addClick(): void{
        this.formFlag = true;
        this.curModule = new Module('','test1',new Date,this.data.logUser._id,this.data.logUser._id,'/test1','',this.data.curProject._id);
    }

    saveClick():void{
        !this.modFlag && (this.curModule.create_time = new Date());
        this.modFlag? this.updateModule(this.curModule) : this.addModule(this.curModule);
    }

    cancelClick():void{
        this.formFlag = false;
        this.modFlag = false;
    }

    updateModule(module):void{
        this.moduleService.update(module)
            .then(module => {
                if(module['err']){
                    this.formFlag = true;
                }else{
                    this.curModule = module;
                    this.getModulesByProjectId();
                    this.formFlag = false;
                    this.modFlag = false;
                }
            })
    }

    updateClick(module):void{
        this.formFlag = true;
        this.modFlag = true;
        this.curModule = new Module(
            module._id,
            module.name,
            module.create_time,
            module.create_user,
            module.principal,
            module.path,
            module.description,
            module.project
        );
    }

    deleteModule(id):void{
        this.moduleService.delete(id)
            .then(module => {
                if(module['err']){
                    alert(module['err']);
                }else{
                    this.getModulesByProjectId();
                    this.formFlag = false;
                }
            })
    }

    deleteClick(id):void{
        this.deleteModule(id);
    }

    detailClick(module):void{
        this.data.current = "intface";
        this.data.intfrom = false;
        this.data.curModul = module;
        this.data.setModule(this.data.curModul);
    }
}


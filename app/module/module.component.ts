import {Component, OnInit, Input} from '@angular/core';
import {Data} from "../data";
import {ModuleService} from "./module.service";
import {Module} from "./module";

@Component({
    moduleId: module.id,
    selector: 'module',
    // styleUrls: ['app/role/role.component.css'],
    templateUrl: '/app/module/module.component.html',

})
export class ModuleComponent implements OnInit{

    modules:Module[];
    curModule:Module;
    formFlag:boolean;
    modFlag:boolean;

    constructor(
        private moduleService:ModuleService,
        private data:Data
    ) {}

    ngOnInit(): void {
        this.getModulesByModuleId();
        this.formFlag = false;
        this.modFlag = false;
    }

    getModulesByModuleId():void{
        this.moduleService.getModulesByProjectId(this.data.curProject._id)
            .then(modules => this.modules = modules);
    }

    addModule(module:Module): void{
        this.moduleService.create(module)
            .then(module => {
                console.log(module);
                if(module['err']){
                    this.formFlag = true;
                }else{
                    this.curModule = module;
                    this.getModulesByModuleId();
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

    }
}


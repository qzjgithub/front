/**
 * Created by a0027 on 2017/3/20.
 */
import {Component, OnInit, Input} from '@angular/core';
import {Data} from "../data";
import {IntfaceService} from "./intface.service";
import {Intface} from "./intface";
import {Module} from "../module/module";
import {ModuleService} from "../module/module.service";

@Component({
    moduleId: module.id,
    selector: 'intface',
    // styleUrls: ['app/role/role.component.css'],
    templateUrl: '/app/intface/intface.component.html',

})
export class IntfaceComponent implements OnInit{

    intfaces:Intface[];
    moduls:Module[];
    curIntface:Intface;
    formFlag:boolean;
    modFlag:boolean;

    constructor(
        private moduleService:ModuleService,
        private intfaceService:IntfaceService,
        private data:Data
    ) {}

    ngOnInit(): void {
        this.moduleService.getModulesByProjectId(this.data.curProject._id)
            .then(modules => {
                this.moduls = modules;
                modules.forEach(m => this.data.setModule(m));
            });
        this[this.data.intfrom?'getIntfacesByProjectId':'getIntfacesByModulId']();
        this.formFlag = false;
        this.modFlag = false;
    }

    getIntfacesByProjectId():void{
        this.intfaceService.getIntfacesByProjectId(this.data.curProject._id)
            .then(intfaces => {
                this.intfaces = []
                intfaces.forEach(intface => {
                    this.data.setModulById(intface.modul)
                        .then(m => {
                            this.intfaces.push(intface);
                        });
                });
            });
    }

    getIntfacesByModulId():void{
        this.intfaceService.getIntfacesByModulId(this.data.curModul._id)
            .then(intfaces => {
                this.intfaces = []
                intfaces.forEach(intface => {
                    this.data.setModulById(intface.modul)
                        .then(m => {
                            this.intfaces.push(intface);
                        });
                });
            });
    }

    addIntface(intface:Intface): void{
        !intface.modul && (intface.modul = 'root');
        intface.full_path = this.data.curProject.path + (intface.modul=='root'?'':this.data.getValue('moduls',intface.modul,'path'))+intface.path;
        this.intfaceService.create(intface)
            .then(intface => {
                if(intface['err']){
                    this.formFlag = true;
                }else{
                    this.curIntface = intface;
                    this[this.data.intfrom?'getIntfacesByProjectId':'getIntfacesByModulId']();
                    this.formFlag = false;
                }
            })
    }

    addClick(): void{
        this.formFlag = true;
        this.curIntface = new Intface('',this.data.curProject._id,this.data.intfrom?'':this.data.curModul._id,new Date,this.data.logUser._id,'','','');
    }

    saveClick():void{
        !this.modFlag && (this.curIntface.create_time = new Date());
        this.modFlag? this.updateIntface(this.curIntface) : this.addIntface(this.curIntface);
    }

    cancelClick():void{
        this.formFlag = false;
        this.modFlag = false;
    }

    updateIntface(intface):void{
        !intface.modul && (intface.modul = 'root');
        intface.full_path = this.data.curProject.path + (intface.modul=='root'?'':this.data.getValue('moduls',intface.modul,'path'))+intface.path;
        this.intfaceService.update(intface)
            .then(intface => {
                if(intface['err']){
                    this.formFlag = true;
                }else{
                    this.curIntface = intface;
                    this[this.data.intfrom?'getIntfacesByProjectId':'getIntfacesByModulId']();
                    this.formFlag = false;
                    this.modFlag = false;
                }
            })
    }

    updateClick(intface):void{
        this.curIntface = new Intface(
            intface._id,
            intface.project,
            intface.modul,
            intface.create_time,
            intface.create_user,
            intface.path,
            intface.full_path,
            intface.description,
        );
        this.formFlag = true;
        this.modFlag = true;
    }

    deleteIntface(id):void{
        this.intfaceService.delete(id)
            .then(intface => {
                if(intface['err']){
                    alert(intface['err']);
                }else{
                    this[this.data.intfrom?'getIntfacesByProjectId':'getIntfacesByModulId']();
                    this.formFlag = false;
                }
            })
    }

    deleteClick(id):void{
        this.deleteIntface(id);
    }
}


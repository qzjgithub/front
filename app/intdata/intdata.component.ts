/**
 * Created by admin on 2017/3/21.
 */
import {Component, OnInit} from "@angular/core";
import {Intdata} from "./intdata";
import {IntdataService} from "./intdata.service";
import {Data} from "../data";
@Component({
    selector: 'intdata',
    templateUrl: '/app/intdata/intdata.component.html'
})

export class IntdataComponent implements OnInit{
    intdatas:Intdata[];
    curIntdata:Intdata;
    formFlag:boolean;
    modFlag:boolean;
    types;

    constructor(
        private intdataService:IntdataService,
        private data:Data
    ) {}

    ngOnInit(): void {
        this.getIntdataByIntfaceId();
        this.formFlag = false;
        this.modFlag = false;
        this.types = [
            {value:'text',text:'文本'},
            {value:'file',text:'文件'},
            {value:'table',text:'数据表'}
        ];
    }

    getIntdataByIntfaceId():void{
        this.intdataService.getIntdataByIntfaceId(this.data.curIntface._id)
            .then(intdatas => {
                this.intdatas = intdatas;
            });
    }

    addIntdata(intdata:Intdata): void{
        this.intdataService.create(intdata)
            .then(intdata => {
                if(intdata['err']){
                    this.formFlag = true;
                }else{
                    this.curIntdata = intdata;
                    this.getIntdataByIntfaceId();
                    this.formFlag = false;
                }
            })
    }

    addClick(): void{
        this.formFlag = true;
        this.curIntdata = new Intdata('',this.data.curIntface._id,new Date,this.data.logUser._id,'',200,'text','','','','','');
    }

    saveClick():void{
        !this.modFlag && (this.curIntdata.create_time = new Date());
        this.modFlag? this.updateIntdata(this.curIntdata) : this.addIntdata(this.curIntdata);
    }

    cancelClick():void{
        this.formFlag = false;
        this.modFlag = false;
    }

    updateIntdata(intdata):void{
        this.intdataService.update(intdata)
            .then(intdata => {
                if(intdata['err']){
                    this.formFlag = true;
                }else{
                    this.curIntdata = intdata;
                    this.getIntdataByIntfaceId();
                    this.formFlag = false;
                    this.modFlag = false;
                }
            })
    }

    updateClick(intdata):void{
        this.curIntdata = new Intdata(
            intdata._id,
            intdata.intface,
            intdata.create_time,
            intdata.create_user,
            intdata.status,
            intdata.code,
            intdata.type,
            intdata.table,
            intdata.text,
            intdata.file,
            intdata.operate,
            intdata.description,
        );
        this.formFlag = true;
        this.modFlag = true;
    }

    deleteIntdata(id):void{
        this.intdataService.delete(id)
            .then(intdata => {
                if(intdata['err']){
                    alert(intdata['err']);
                }else{
                    this.getIntdataByIntfaceId();
                    this.formFlag = false;
                }
            })
    }

    deleteClick(id):void{
        this.deleteIntdata(id);
    }
}
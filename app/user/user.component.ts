import {Component} from '@angular/core';

@Component({
    selector: 'user',
    styleUrls: ['app/user/user.component.css'],
    templateUrl: 'app/user/user.component.html',

})
export class UserComponent {

    formFlag:Boolean;
    constructor() {
        this.formFlag = false;
    }

    addClick(): void{
        this.formFlag = true;
    }

    cancelClick():void{
        this.formFlag = false;
    }
}


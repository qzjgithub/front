/**
 * Created by a0027 on 2017/3/20.
 */
export class Intface{
    constructor(
        public _id: string,
        public project:string,
        public modul:string,
        public create_time:Date,
        public create_user:string,
        public type:string,
        public path:string,
        public full_path:string,
        public description:string,
    ){}
}
/**
 * Created by a0027 on 2017/3/16.
 */
export class Module{
    constructor(
        public _id: string,
        public name:string,
        public create_time:Date,
        public create_user:string,
        public principal:string,
        public path:string,
        public description:string,
        public project:string
    ){}
}
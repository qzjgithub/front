/**
 * Created by admin on 2017/3/21.
 */
export class Intdata{
    constructor(
        public _id: string,
        public intface:string,
        public create_time:Date,
        public create_user:string,
        public status:string,
        public code:number,
        public type:string,
        public table:string,
        public text:string,
        public file:string,
        public operate:string,
        public description:string,
    ){}
}
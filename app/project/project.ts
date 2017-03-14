export class Project{
    constructor(
        public _id: string,
        public name:string,
        public create_time:Date,
        public create_user:string,
        public principal:string,
        public path:string,
        public port:string,
        public description:string
    ){}
}
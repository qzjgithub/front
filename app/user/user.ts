/**
 * Created by a0027 on 2017/3/2.
 */
export class User {
    constructor(
        public _id: string,
        public name: string,
        public password: string,
        public create_time: Date,
        public create_user:string,
        public role:string,
        public description:string
    ) {  }
}
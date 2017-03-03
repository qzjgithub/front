/**
 * Created by a0027 on 2017/3/3.
 */
import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {User} from "./user";

@Injectable()
export class UserService {

    private usersUrl = '/users';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    getUsers(): Promise<User[]> {
        return this.http.get(this.usersUrl)
            .toPromise()
            .then(function(response){
                console.log(response.json());
                return response.json() as User[]
            })
            .catch(this.handleError);
        // return Promise.resolve(HEROES);
    }

    create(user: User) {
        return this.http
            .post(this.usersUrl,JSON.stringify(user), {headers: this.headers})
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}


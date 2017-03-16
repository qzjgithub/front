/**
 * Created by a0027 on 2017/3/3.
 */
import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {User} from "./user";

@Injectable()
export class UserService {

    private usersUrl = '/user';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    getUsers(): Promise<User[]> {
        return this.http.get(this.usersUrl)
            .toPromise()
            .then(function(response){
                return response.json() as User[]
            })
            .catch(this.handleError);
    }

    create(user: User) {
        return this.http
            .post(this.usersUrl,JSON.stringify(user), {headers: this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    update(user: User) {
        return this.http
            .put(this.usersUrl,JSON.stringify(user), {headers: this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    delete(id:string){
        return this.http
            .delete(this.usersUrl+'/'+id)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}


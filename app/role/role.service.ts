import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Role} from "./role";

@Injectable()
export class RoleService {

    private rolesUrl = '/role';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    getRoles(): Promise<Role[]> {
        return this.http.get(this.rolesUrl)
            .toPromise()
            .then(function(response){
                return response.json() as Role[]
            })
            .catch(this.handleError);
        // return Promise.resolve(HEROES);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}


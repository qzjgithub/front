import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Project} from './project';
@Injectable()
export class ProjectService{
    private projectUrl = '/project';
    private headers = new Headers({'Content-Type':'application/json'});

    constructor(private http: Http){}

    getProjects():Promise<Project[]>{
        return this.http.get(this.projectUrl)
            .toPromise()
            .then(response => response.json() as Project[])
            .catch (this.handleError);
    }

    create(user: Project) {
        return this.http
            .post(this.projectUrl,JSON.stringify(user), {headers: this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error:any):Promise<any>{
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
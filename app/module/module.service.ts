import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Module} from './module';
@Injectable()
export class ModuleService{
    private moduleUrl = '/modul';
    private headers = new Headers({'Content-Type':'application/json'});

    constructor(private http: Http){}

    getModulesByProjectId(id:string):Promise<Module[]>{
        return this.http.get(this.moduleUrl+'/'+id)
            .toPromise()
            .then(response => response.json() as Module[])
            .catch (this.handleError);
    }

    create( module: Module) {
        return this.http
            .post(this.moduleUrl,JSON.stringify( module), {headers: this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    update( module: Module) {
        return this.http
            .put(this.moduleUrl,JSON.stringify( module), {headers: this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    delete(id:string){
        return this.http
            .delete(this.moduleUrl+'/'+id)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error:any):Promise<any>{
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
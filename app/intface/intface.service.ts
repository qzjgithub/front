/**
 * Created by a0027 on 2017/3/20.
 */
import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Intface} from './intface';
@Injectable()
export class IntfaceService{
    private intfaceUrl = '/intface';
    private headers = new Headers({'Content-Type':'application/json'});

    constructor(private http: Http){}

    getIntfacesByProjectId(id:string):Promise<Intface[]>{
        return this.http.get(this.intfaceUrl+'/project='+id)
            .toPromise()
            .then(response => response.json() as Intface[])
            .catch (this.handleError);
    }

    getIntfacesByModulId(id:string):Promise<Intface[]>{
        return this.http.get(this.intfaceUrl+'/modul='+id)
            .toPromise()
            .then(response => response.json() as Intface[])
            .catch (this.handleError);
    }

    create( intface: Intface) {
        return this.http
            .post(this.intfaceUrl,JSON.stringify( intface), {headers: this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    update( intface: Intface) {
        return this.http
            .put(this.intfaceUrl,JSON.stringify( intface ), {headers: this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    delete(id:string){
        return this.http
            .delete(this.intfaceUrl+'/'+id)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error:any):Promise<any>{
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
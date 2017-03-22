/**
 * Created by admin on 2017/3/21.
 */
import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import {Intdata} from "./intdata";
@Injectable()
export class IntdataService{
    private intdataUrl = '/intdata';
    private headers = new Headers({'Content-Type':'application/json'});

    constructor(private http: Http){}

    getIntdataByIntfaceId(id:string):Promise<Intdata[]>{
        return this.http.get(this.intdataUrl+'/'+id)
            .toPromise()
            .then(response => response.json() as Intdata[])
            .catch(this.handleError);
    }

    create(intdata:Intdata){
        return this.http
            .post(this.intdataUrl,JSON.stringify(intdata),{headers:this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }
    update( intdata: Intdata) {
        return this.http
            .put(this.intdataUrl,JSON.stringify( intdata ), {headers: this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    delete(id:string){
        return this.http
            .delete(this.intdataUrl+'/'+id)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error:any):Promise<any>{
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
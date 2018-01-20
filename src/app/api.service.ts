import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Squadra } from './squadra/squadra.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class ApiService {
    private serviceUrl:string = "http://localhost:3000/api/"

    constructor(private http: HttpClient, apiService: ApiService    ){
    }

    get(path: string, id: number){
    }

    list(path: string): Observable<Squadra[]>{
        return this.http.get<Squadra[]>(this.serviceUrl+path)
        /*let response;
        if(path=="squadra"){
            response = this.http.get(this.serviceUrl+path, {headers: this.getHeaders()})
                            .map(res => JSON.stringify(res))
                            .catch(this.handleError);
        }*/
        /*if(path=="tickets"){
            response = this.lsTickets();
        }
        return response;*/
    }

    /*lsTickets(){
            this.http.get(this.serviceUrl+"/tickets", {headers: this.getHeaders()})
                            .map(res => res.json())
                            .subscribe(result => this.tickets_list = result);
            return this.tickets_list;
    }*/

    private getHeaders(){
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return headers;
    }


    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }

    private handleError (error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
        errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
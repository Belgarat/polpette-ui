import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Squadra } from './squadra/squadra.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class ApiService {
    private serviceUrl:string = "http://localhost:3000/api/"

    constructor(private http: HttpClient){
    }

    /** GET squadre from the server */
    getSquadre (): Observable<Squadra[]> {
        return this.http.get<Squadra[]>(this.serviceUrl+'squadre')
        .pipe(
            tap(squadre => this.log(`fetched squadre`)),
            catchError(this.handleError('getsquadre', []))
        );
    }

    /** GET Squadra by id. Return `undefined` when id not found */
    getSquadraNo404<Data>(id: string): Observable<Squadra> {
        const url = `${this.serviceUrl+'squadre'}/?id=${id}`;
        return this.http.get<Squadra[]>(url)
        .pipe(
            map(squadre => squadre[0]), // returns a {0|1} element array
            tap(h => {
            const outcome = h ? `fetched` : `did not find`;
            this.log(`${outcome} squadra id=${id}`);
            }),
            catchError(this.handleError<Squadra>(`getSquadra id=${id}`))
        );
    }
    
    /** GET Squadra by id. Will 404 if id not found */
    getSquadra(id: string): Observable<Squadra> {
        const url = `${this.serviceUrl+'squadre'}/${id}`;
        return this.http.get<Squadra>(url).pipe(
        tap(_ => this.log(`fetched Squadra id=${id}`)),
        catchError(this.handleError<Squadra>(`getSquadra id=${id}`))
        );
    }
    
    /* GET squadre whose name contains search term */
    searchsquadre(term: string): Observable<Squadra[]> {
        if (!term.trim()) {
        // if not search term, return empty Squadra array.
        return of([]);
        }
        return this.http.get<Squadra[]>(`api/squadre/?name=${term}`).pipe(
        tap(_ => this.log(`found squadre matching "${term}"`)),
        catchError(this.handleError<Squadra[]>('searchsquadre', []))
        );
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

    /** POST: add a new hero to the server */
    addSquadra (squadra: Squadra): Observable<Squadra> {
        return this.http.post<Squadra>(this.serviceUrl+'squadre', squadra, httpOptions).pipe(
            tap((squadra: Squadra) => this.log(`added hero w/ id=${squadra.id}`)),
            catchError(this.handleError<Squadra>('addSquadra'))
        );
    }


    /** DELETE: delete the squadra from the server */
    deleteSquadra (squadra: Squadra | string): Observable<Squadra> {
        const id = typeof squadra === 'string' ? squadra : squadra.id;
        const url = `${this.serviceUrl+'squadre'}/${id}`;
    
        return this.http.delete<Squadra>(url, httpOptions).pipe(
            tap(_ => this.log(`deleted hero id=${id}`)),
            catchError(this.handleError<any>('deleteSquadra'))
        );
    }
    
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
    
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
    
        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
    
        // Let the app keep running by returning an empty result.
        return of(result as T);
        };
    }

    /** Log a SquadraService message with the MessageService */
    private log(message: string) {
        console.log('SquadraService: ' + message);
    }

    /*lsTickets(){
            this.http.get(this.serviceUrl+"/tickets", {headers: this.getHeaders()})
                            .map(res => res.json())
                            .subscribe(result => this.tickets_list = result);
            return this.tickets_list;
    }*/

    /*private getHeaders(){
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
    }*/

}
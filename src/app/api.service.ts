import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Squadra } from './squadra/squadra.model';
import { Campionato } from './campionato/campionato.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class ApiService {
    private serviceUrl:string = "http://10.121.1.54:3000/api/"

    constructor(private http: HttpClient){
    }

    /** GESTIONE DELLE SQUADRE */

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
    /*{"where":{"campionatoId":{"like":"5a6a3e710d86ee370314f41e"}}}*/
    /* GET squadre whose name contains search term */
    filtersquadre(term: string): Observable<Squadra[]> {
        if (!term.trim()) {
        // if not search term, return empty Squadra array.
        return of([]);
        }
        return this.http.get<Squadra[]>(`api/squadre/?name=${term}`).pipe(
            tap(_ => this.log(`found squadre matching "${term}"`)),
            catchError(this.handleError<Squadra[]>('searchsquadre', []))
        );
    }

    /** PUT: update the hero on the server */
    updateSquadra (squadra: Squadra): Observable<any> {
        return this.http.patch(this.serviceUrl + 'squadre', squadra, httpOptions).pipe(
            tap(_ => this.log(`updated hero id=${squadra.id}`)),
            catchError(this.handleError<any>('updateSquadra'))
        );
    }

    /** POST: add a new hero to the server */
    addSquadra (squadra: Squadra): Observable<Squadra> {
        return this.http.post<Squadra>(this.serviceUrl + 'squadre', squadra, httpOptions).pipe(
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

    /** GESTIONE DEI CAMPIONATI */

    /** GET campionati from the server */
    getCampionati (): Observable<Campionato[]> {
        return this.http.get<Campionato[]>(this.serviceUrl+'campionati')
        .pipe(
            tap(campionato => this.log(`fetched campionati`)),
            catchError(this.handleError('getCampionati', []))
        );
    }

    /** GET Campionato by id. Return `undefined` when id not found */
    getCampionatoNo404<Data>(id: string): Observable<Campionato> {
        const url = `${this.serviceUrl+'squadre'}/?id=${id}`;
        return this.http.get<Campionato[]>(url)
        .pipe(
            map(campionato => campionato[0]), // returns a {0|1} element array
            tap(h => {
            const outcome = h ? `fetched` : `did not find`;
            this.log(`${outcome} campionato id=${id}`);
            }),
            catchError(this.handleError<Campionato>(`getCampionato id=${id}`))
        );
    }

    /** GET Campionato by id. Will 404 if id not found */
    getCampionato(id: string): Observable<Campionato> {
        const url = `${this.serviceUrl+'campionati'}/${id}`;
        return this.http.get<Campionato>(url).pipe(
            tap(_ => this.log(`fetched Campionato id=${id}`)),
            catchError(this.handleError<Campionato>(`getCampionato id=${id}`))
        );
    }

    /* GET squadre whose name contains search term */
    searchcampionati(term: string): Observable<Campionato[]> {
        if (!term.trim()) {
        // if not search term, return empty Squadra array.
        return of([]);
        }
        return this.http.get<Campionato[]>(`api/campionati/?name=${term}`).pipe(
            tap(_ => this.log(`found campionati matching "${term}"`)),
            catchError(this.handleError<Campionato[]>('searchcampionati', []))
        );
    }

    /* GET squadre whose name contains search term */
    search(object: string, field: string, term: string): Observable<any[]> {
        if (!term.trim() && !object.trim() && !field.trim()) {
        // if not search term, return empty Squadra array.
            this.log('parameter error: search in ' + object + ', field ' + field + ', term ' + term);
            return of([]);
        }
        this.log('parameter ok: search in ' + object + ', field ' + field + ', term ' + term);
        let filter = `{"where":{"${field}":{"like":"${term}"}}}`;
        console.log(JSON.stringify(filter));
        return this.http.get<Campionato[]>(this.serviceUrl + object + '/?filter=' + filter).pipe(
            tap(_ => this.log(`found campionati matching "${term}"`)),
            catchError(this.handleError<Campionato[]>('searchcampionati', []))
        );
    }

    /** PUT: update the hero on the server */
    updateCampionato (campionato: Campionato): Observable<any> {
        return this.http.patch(this.serviceUrl + 'campionati', campionato, httpOptions).pipe(
            tap(_ => this.log(`updated campionato id=${campionato.id}`)),
            catchError(this.handleError<any>('updateCampionato'))
        );
    }

    /** POST: add a new hero to the server */
    addCampionato (campionato: Campionato): Observable<Campionato> {
        return this.http.post<Campionato>(this.serviceUrl + 'campionati', campionato, httpOptions).pipe(
            tap((campionato: Campionato) => this.log(`added campionato w/ id=${campionato.id}`)),
            catchError(this.handleError<Campionato>('addCampionato'))
        );
    }


    /** DELETE: delete the squadra from the server */
    deleteCampionato (campionato: Campionato | string): Observable<Campionato> {
        const id = typeof campionato === 'string' ? campionato : campionato.id;
        const url = `${this.serviceUrl+'campionati'}/${id}`;

        return this.http.delete<Campionato>(url, httpOptions).pipe(
            tap(_ => this.log(`deleted campionato id=${id}`)),
            catchError(this.handleError<any>('deleteCampionato'))
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
        console.log('CampionatoService: ' + message);
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
import { APP_SETTINGS } from './../settings/settings';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap, filter } from 'rxjs/operators';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Squadra } from './squadra/squadra.model';
import { Campionato } from './campionato/campionato.model';
import { Punteggio } from './punteggio/punteggio.model';
import { Slidegallery } from './slidegallery/slidegallery.model';
import { Subject } from 'rxjs/Subject';



var httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class ApiService {
    private serviceUrl = APP_SETTINGS.apiUrl;

    constructor(private http: HttpClient) {}

    /** GET squadre from the server */
    getImages (container: String): Observable<Slidegallery[]> {
        return this.http.get<Slidegallery[]>(this.serviceUrl + 'gallery' + '/' + container + '/' + 'files')
        .pipe(
            tap(container => this.log(`fetched container` + container)),
            catchError(this.handleError('getcontainer', []))
        );
    }

    /** GESTIONE DELLE SQUADRE */

    /** GET squadre from the server */
    getSquadre (): Observable<Squadra[]> {
        return this.http.get<Squadra[]>(this.serviceUrl + 'squadre')
        .pipe(
            tap(squadre => this.log(`fetched squadre`)),
            catchError(this.handleError('getsquadre', []))
        );
    }

    
    /** GET Squadra by id. Return `undefined` when id not found */
    getSquadraNo404<Data>(id: string): Observable<Squadra> {
        const url = `${this.serviceUrl + 'squadre'}/?id=${id}`;
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
        const url = `${this.serviceUrl + 'squadre'}/${id}`;
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

    /* GET squadre whose name contains search term */
    searchByForm(term: Observable<string>) {
        console.log(term);
        return term.pipe(
            debounceTime(400),
            distinctUntilChanged(),
            switchMap(term => this.findSquadre(term))
        );
    }

    findSquadre(term: string): Observable<Squadra[]> {
        return this.http.get<Squadra[]>(this.serviceUrl + 'squadre')
        .pipe(
            map(e => e.filter(el => el.nome.toLocaleLowerCase().indexOf(term) > -1))
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
        let delId = [];
        let punt = this.getPunteggi().subscribe(punt => {
            punt.map( row => {
                if(row.squadraId === id){
                    this.deletePunteggio(row.id).subscribe();
                }
            })
        });
        return this.http.delete<Squadra>(url, httpOptions).pipe(
            tap(_ => this.log(`deleted hero id=${id}`)),
            catchError(this.handleError<any>('deleteSquadra'))
        );
    }

    /** GESTIONE DEI CAMPIONATI */

    /** GET campionati from the server */
    getCampionati (): Observable<Campionato[]> {
        return this.http.get<Campionato[]>(this.serviceUrl + 'campionati')
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

    /** GET Campionato by id. Will 404 if id not found */
    getCurrentCampionato(): any {
        const filter = `{"where":{"current":"1"}}`;
        return this.http.get<Campionato>(this.serviceUrl + 'campionati' + '/?filter=' + filter).pipe(
            tap(_ => this.log(`found campionati matching ""`)),
            catchError(this.handleError<Campionato>('searchcampionati'))
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
        const filter = `{"where":{"${field}":{"like":"${term}"}}}`;
        return this.http.get<any[]>(this.serviceUrl + object + '/?filter=' + filter).pipe(
            tap(_ => this.log(`found campionati matching "${term}"`)),
            catchError(this.handleError<any[]>('searchcampionati', []))
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
        const url = `${this.serviceUrl + 'campionati'}/${id}`;
        return this.http.delete<Campionato>(url, httpOptions).pipe(
            tap(_ => this.log(`deleted campionato id=${id}`)),
            catchError(this.handleError<any>('deleteCampionato'))
        );
    }


    /** PUT: set current campionato to the server */
    setCurrentCampionato (campionato: Campionato | string): Observable<Campionato> {
        const id = typeof campionato === 'string' ? campionato : campionato.id;
        const url = `${this.serviceUrl + 'campionati'}/${id}/set-current`;

        return this.http.put<Campionato>(url, httpOptions).pipe(
            tap(_ => this.log(`Set current campionato id=${id}`)),
            catchError(this.handleError<any>('setCurrentCampionato'))
        );
    }

    /** GESTIONE DEI PUNTEGGI */

    /** GET squadre from the server */
    getPunteggi (): Observable<Punteggio[]> {
        return this.http.get<Punteggio[]>(this.serviceUrl + 'punteggi' + '?filter[order]=punteggio DESC')
        .pipe(
            tap(punteggi => this.log(`fetched punteggi`)),
            catchError(this.handleError('getpunteggi', []))
        );
    }

    /** GET campionati from the server */
    getPunteggio (id: string): Observable<Punteggio> {
        const url = `${this.serviceUrl + 'punteggi'}/${id}`;
        return this.http.get<Punteggio>(url)
        .pipe(
            tap(punteggio => this.log(`fetched punteggi`)),
            catchError(this.handleError<Punteggio>(`getPunteggio id=${id}`))
        );
    }

    /** POST: add a new hero to the server */
    addPunteggio (punteggio: Punteggio): Observable<Punteggio> {
        delete punteggio.id;
        return this.http.post<Punteggio>(this.serviceUrl + 'punteggi', punteggio, httpOptions).pipe(
            tap((punteggio: Punteggio) => this.log(`added campionato w/ id=${punteggio.id}`)),
            catchError(this.handleError<Punteggio>('addPunteggio'))
        );
    }

    /** POST: add point to team */
    changePunteggio (punteggio: Punteggio): Observable<Punteggio> {
        return this.http.patch(this.serviceUrl + 'punteggi', punteggio, httpOptions).pipe(
            tap(_ => this.log(`updated campionato id=${punteggio.id}`)),
            catchError(this.handleError<any>('updateCampionato'))
        );
    }

    /** DELETE: delete the punteggio from the server */
    deletePunteggio (squadra: Squadra | string): Observable<Squadra> {
        const id = typeof squadra === 'string' ? squadra : squadra.id;
        console.log("Id classifica: " + id);
        const url = `${this.serviceUrl+'punteggi/' + id}`;

        return this.http.delete<Squadra>(url, httpOptions).pipe(
            tap(_ => this.log(`deleted punteggio id=${id}`)),
            catchError(this.handleError<any>('deletePunteggio'))
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
        console.log('CampionatoService: ' + message);
    }

}

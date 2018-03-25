webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/api.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_settings__ = __webpack_require__("../../../../../src/settings/settings.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__ = __webpack_require__("../../../../rxjs/_esm5/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators__ = __webpack_require__("../../../../rxjs/_esm5/operators.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var httpOptions = {
    headers: new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json' })
};
var ApiService = (function () {
    function ApiService(http) {
        this.http = http;
        this.serviceUrl = __WEBPACK_IMPORTED_MODULE_0__settings_settings__["a" /* APP_SETTINGS */].apiUrl;
    }
    /** GET squadre from the server */
    ApiService.prototype.getImages = function (container) {
        var _this = this;
        return this.http.get(this.serviceUrl + 'gallery' + '/' + container + '/' + 'files')
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["f" /* tap */])(function (cont) { return _this.log("fetched container" + cont); }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["a" /* catchError */])(this.handleError('getcontainer', [])));
    };
    /** GESTIONE DELLE SQUADRE */
    /** GET squadre from the server */
    ApiService.prototype.getSquadre = function () {
        var _this = this;
        return this.http.get(this.serviceUrl + 'squadre')
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["f" /* tap */])(function (squadre) { return _this.log("fetched squadre"); }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["a" /* catchError */])(this.handleError('getsquadre', [])));
    };
    /** GET Squadra by id. Return `undefined` when id not found */
    ApiService.prototype.getSquadraNo404 = function (id) {
        var _this = this;
        var url = this.serviceUrl + 'squadre' + "/?id=" + id;
        return this.http.get(url)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["d" /* map */])(function (squadre) { return squadre[0]; }), // returns a {0|1} element array
        Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["f" /* tap */])(function (h) {
            var outcome = h ? "fetched" : "did not find";
            _this.log(outcome + " squadra id=" + id);
        }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["a" /* catchError */])(this.handleError("getSquadra id=" + id)));
    };
    /** GET Squadra by id. Will 404 if id not found */
    ApiService.prototype.getSquadra = function (id) {
        var _this = this;
        var url = this.serviceUrl + 'squadre' + "/" + id;
        return this.http.get(url).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["f" /* tap */])(function (_) { return _this.log("fetched Squadra id=" + id); }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["a" /* catchError */])(this.handleError("getSquadra id=" + id)));
    };
    /* GET squadre whose name contains search term */
    ApiService.prototype.searchsquadre = function (term) {
        var _this = this;
        if (!term.trim()) {
            // if not search term, return empty Squadra array.
            return Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__["a" /* of */])([]);
        }
        return this.http.get("api/squadre/?name=" + term).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["f" /* tap */])(function (_) { return _this.log("found squadre matching \"" + term + "\""); }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["a" /* catchError */])(this.handleError('searchsquadre', [])));
    };
    /* GET squadre whose name contains search term */
    ApiService.prototype.searchByForm = function (term) {
        var _this = this;
        console.log(term);
        return term.pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["b" /* debounceTime */])(400), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["c" /* distinctUntilChanged */])(), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["e" /* switchMap */])(function (term) { return _this.findSquadre(term); }));
    };
    ApiService.prototype.findSquadre = function (term) {
        return this.http.get(this.serviceUrl + 'squadre')
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["d" /* map */])(function (e) { return e.filter(function (el) { return el.nome.toLocaleLowerCase().indexOf(term) > -1; }); }));
    };
    /*{"where":{"campionatoId":{"like":"5a6a3e710d86ee370314f41e"}}}*/
    /* GET squadre whose name contains search term */
    ApiService.prototype.filtersquadre = function (term) {
        var _this = this;
        if (!term.trim()) {
            // if not search term, return empty Squadra array.
            return Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__["a" /* of */])([]);
        }
        return this.http.get("api/squadre/?name=" + term).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["f" /* tap */])(function (_) { return _this.log("found squadre matching \"" + term + "\""); }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["a" /* catchError */])(this.handleError('searchsquadre', [])));
    };
    /** PUT: update the hero on the server */
    ApiService.prototype.updateSquadra = function (squadra) {
        var _this = this;
        return this.http.patch(this.serviceUrl + 'squadre', squadra, httpOptions).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["f" /* tap */])(function (_) { return _this.log("updated hero id=" + squadra.id); }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["a" /* catchError */])(this.handleError('updateSquadra')));
    };
    /** POST: add a new hero to the server */
    ApiService.prototype.addSquadra = function (squadra) {
        var _this = this;
        return this.http.post(this.serviceUrl + 'squadre', squadra, httpOptions).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["f" /* tap */])(function (squadra) { return _this.log("added hero w/ id=" + squadra.id); }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["a" /* catchError */])(this.handleError('addSquadra')));
    };
    /** DELETE: delete the squadra from the server */
    ApiService.prototype.deleteSquadra = function (squadra) {
        var _this = this;
        var id = typeof squadra === 'string' ? squadra : squadra.id;
        var url = this.serviceUrl + 'squadre' + "/" + id;
        var delId = [];
        var punt = this.getPunteggi().subscribe(function (punt) {
            punt.map(function (row) {
                if (row.squadraId === id) {
                    _this.deletePunteggio(row.id).subscribe();
                }
            });
        });
        return this.http.delete(url, httpOptions).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["f" /* tap */])(function (_) { return _this.log("deleted hero id=" + id); }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["a" /* catchError */])(this.handleError('deleteSquadra')));
    };
    /** GESTIONE DEI CAMPIONATI */
    /** GET campionati from the server */
    ApiService.prototype.getCampionati = function () {
        var _this = this;
        return this.http.get(this.serviceUrl + 'campionati')
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["f" /* tap */])(function (campionato) { return _this.log("fetched campionati"); }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["a" /* catchError */])(this.handleError('getCampionati', [])));
    };
    /** GET Campionato by id. Return `undefined` when id not found */
    ApiService.prototype.getCampionatoNo404 = function (id) {
        var _this = this;
        var url = this.serviceUrl + 'squadre' + "/?id=" + id;
        return this.http.get(url)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["d" /* map */])(function (campionato) { return campionato[0]; }), // returns a {0|1} element array
        Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["f" /* tap */])(function (h) {
            var outcome = h ? "fetched" : "did not find";
            _this.log(outcome + " campionato id=" + id);
        }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["a" /* catchError */])(this.handleError("getCampionato id=" + id)));
    };
    /** GET Campionato by id. Will 404 if id not found */
    ApiService.prototype.getCampionato = function (id) {
        var _this = this;
        var url = this.serviceUrl + 'campionati' + "/" + id;
        return this.http.get(url).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["f" /* tap */])(function (_) { return _this.log("fetched Campionato id=" + id); }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["a" /* catchError */])(this.handleError("getCampionato id=" + id)));
    };
    /** GET Campionato by id. Will 404 if id not found */
    ApiService.prototype.getCurrentCampionato = function () {
        var _this = this;
        var filter = "{\"where\":{\"current\":\"1\"}}";
        return this.http.get(this.serviceUrl + 'campionati' + '/?filter=' + filter).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["f" /* tap */])(function (_) { return _this.log("found campionati matching \"\""); }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["a" /* catchError */])(this.handleError('searchcampionati')));
    };
    /* GET squadre whose name contains search term */
    ApiService.prototype.searchcampionati = function (term) {
        var _this = this;
        if (!term.trim()) {
            // if not search term, return empty Squadra array.
            return Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__["a" /* of */])([]);
        }
        return this.http.get("api/campionati/?name=" + term).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["f" /* tap */])(function (_) { return _this.log("found campionati matching \"" + term + "\""); }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["a" /* catchError */])(this.handleError('searchcampionati', [])));
    };
    /* GET squadre whose name contains search term */
    ApiService.prototype.search = function (object, field, term) {
        var _this = this;
        if (!term.trim() && !object.trim() && !field.trim()) {
            // if not search term, return empty Squadra array.
            this.log('parameter error: search in ' + object + ', field ' + field + ', term ' + term);
            return Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__["a" /* of */])([]);
        }
        this.log('parameter ok: search in ' + object + ', field ' + field + ', term ' + term);
        var filter = "{\"where\":{\"" + field + "\":{\"like\":\"" + term + "\"}}}";
        return this.http.get(this.serviceUrl + object + '/?filter=' + filter).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["f" /* tap */])(function (_) { return _this.log("found campionati matching \"" + term + "\""); }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["a" /* catchError */])(this.handleError('searchcampionati', [])));
    };
    /** PUT: update the hero on the server */
    ApiService.prototype.updateCampionato = function (campionato) {
        var _this = this;
        return this.http.patch(this.serviceUrl + 'campionati', campionato, httpOptions).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["f" /* tap */])(function (_) { return _this.log("updated campionato id=" + campionato.id); }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["a" /* catchError */])(this.handleError('updateCampionato')));
    };
    /** POST: add a new hero to the server */
    ApiService.prototype.addCampionato = function (campionato) {
        var _this = this;
        return this.http.post(this.serviceUrl + 'campionati', campionato, httpOptions).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["f" /* tap */])(function (campionato) { return _this.log("added campionato w/ id=" + campionato.id); }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["a" /* catchError */])(this.handleError('addCampionato')));
    };
    /** DELETE: delete the squadra from the server */
    ApiService.prototype.deleteCampionato = function (campionato) {
        var _this = this;
        var id = typeof campionato === 'string' ? campionato : campionato.id;
        var url = this.serviceUrl + 'campionati' + "/" + id;
        return this.http.delete(url, httpOptions).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["f" /* tap */])(function (_) { return _this.log("deleted campionato id=" + id); }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["a" /* catchError */])(this.handleError('deleteCampionato')));
    };
    /** PUT: set current campionato to the server */
    ApiService.prototype.setCurrentCampionato = function (campionato) {
        var _this = this;
        var id = typeof campionato === 'string' ? campionato : campionato.id;
        var url = this.serviceUrl + 'campionati' + "/" + id + "/set-current";
        return this.http.put(url, httpOptions).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["f" /* tap */])(function (_) { return _this.log("Set current campionato id=" + id); }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["a" /* catchError */])(this.handleError('setCurrentCampionato')));
    };
    /** GESTIONE DEI PUNTEGGI */
    /** GET squadre from the server */
    ApiService.prototype.getPunteggi = function () {
        var _this = this;
        return this.http.get(this.serviceUrl + 'punteggi' + '?filter[order]=punteggio DESC')
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["f" /* tap */])(function (punteggi) { return _this.log("fetched punteggi"); }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["a" /* catchError */])(this.handleError('getpunteggi', [])));
    };
    /** GET campionati from the server */
    ApiService.prototype.getPunteggio = function (id) {
        var _this = this;
        var url = this.serviceUrl + 'punteggi' + "/" + id;
        return this.http.get(url)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["f" /* tap */])(function (punteggio) { return _this.log("fetched punteggi"); }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["a" /* catchError */])(this.handleError("getPunteggio id=" + id)));
    };
    /** POST: add a new hero to the server */
    ApiService.prototype.addPunteggio = function (punteggio) {
        var _this = this;
        delete punteggio.id;
        return this.http.post(this.serviceUrl + 'punteggi', punteggio, httpOptions).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["f" /* tap */])(function (punteggio) { return _this.log("added campionato w/ id=" + punteggio.id); }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["a" /* catchError */])(this.handleError('addPunteggio')));
    };
    /** POST: add point to team */
    ApiService.prototype.changePunteggio = function (punteggio) {
        var _this = this;
        return this.http.patch(this.serviceUrl + 'punteggi', punteggio, httpOptions).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["f" /* tap */])(function (_) { return _this.log("updated campionato id=" + punteggio.id); }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["a" /* catchError */])(this.handleError('updateCampionato')));
    };
    /** DELETE: delete the punteggio from the server */
    ApiService.prototype.deletePunteggio = function (squadra) {
        var _this = this;
        var id = typeof squadra === 'string' ? squadra : squadra.id;
        console.log("Id classifica: " + id);
        var url = "" + (this.serviceUrl + 'punteggi/' + id);
        return this.http.delete(url, httpOptions).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["f" /* tap */])(function (_) { return _this.log("deleted punteggio id=" + id); }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["a" /* catchError */])(this.handleError('deletePunteggio')));
    };
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    ApiService.prototype.handleError = function (operation, result) {
        var _this = this;
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            _this.log(operation + " failed: " + error.message);
            // Let the app keep running by returning an empty result.
            return Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__["a" /* of */])(result);
        };
    };
    /** Log a SquadraService message with the MessageService */
    ApiService.prototype.log = function (message) {
        console.log('CampionatoService: ' + message);
    };
    ApiService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]])
    ], ApiService);
    return ApiService;
}());



/***/ }),

/***/ "../../../../../src/app/app-load.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export init_app */
/* unused harmony export get_settings */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppLoadModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_load_service__ = __webpack_require__("../../../../../src/app/app-load.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



function init_app(appLoadService) {
    return function () { return appLoadService.initializeApp(); };
}
function get_settings(appLoadService) {
    return function () { return appLoadService.getSettings(); };
}
var AppLoadModule = (function () {
    function AppLoadModule() {
    }
    AppLoadModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClientModule */]],
            providers: [
                __WEBPACK_IMPORTED_MODULE_2__app_load_service__["a" /* AppLoadService */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["APP_INITIALIZER"], useFactory: init_app, deps: [__WEBPACK_IMPORTED_MODULE_2__app_load_service__["a" /* AppLoadService */]], multi: true },
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["APP_INITIALIZER"], useFactory: get_settings, deps: [__WEBPACK_IMPORTED_MODULE_2__app_load_service__["a" /* AppLoadService */]], multi: true }
            ]
        })
    ], AppLoadModule);
    return AppLoadModule;
}());



/***/ }),

/***/ "../../../../../src/app/app-load.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppLoadService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings__ = __webpack_require__("../../../../../src/settings/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppLoadService = (function () {
    function AppLoadService(httpClient) {
        this.httpClient = httpClient;
    }
    AppLoadService.prototype.initializeApp = function () {
        return new Promise(function (resolve, reject) {
            console.log("initializeApp:: inside promise");
            setTimeout(function () {
                console.log("initializeApp:: inside setTimeout");
                // doing something
                resolve();
            }, 3000);
        });
    };
    AppLoadService.prototype.getSettings = function () {
        console.log("getSettings:: before http.get call");
        var promise = this.httpClient.get('../assets/config.json')
            .toPromise()
            .then(function (settings) {
            console.log("Settings from API: ", settings);
            __WEBPACK_IMPORTED_MODULE_3__settings__["a" /* APP_SETTINGS */].appTitle = settings[0].appTitle;
            __WEBPACK_IMPORTED_MODULE_3__settings__["a" /* APP_SETTINGS */].apiUrl = settings[0].apiUrl;
            __WEBPACK_IMPORTED_MODULE_3__settings__["a" /* APP_SETTINGS */].imageUrl = settings[0].imageUrl;
            __WEBPACK_IMPORTED_MODULE_3__settings__["a" /* APP_SETTINGS */].slideHeight = settings[0].slideHeight;
            console.log("APP_SETTINGS: ", __WEBPACK_IMPORTED_MODULE_3__settings__["a" /* APP_SETTINGS */]);
            return settings;
        });
        return promise;
    };
    AppLoadService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], AppLoadService);
    return AppLoadService;
}());



/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_views_component__ = __webpack_require__("../../../../../src/app/views/views.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__campionato_campionato_component__ = __webpack_require__("../../../../../src/app/campionato/campionato.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__campionato_detail_campionato_detail_component__ = __webpack_require__("../../../../../src/app/campionato-detail/campionato-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__punteggio_punteggio_component__ = __webpack_require__("../../../../../src/app/punteggio/punteggio.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__squadra_squadra_component__ = __webpack_require__("../../../../../src/app/squadra/squadra.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__squadra_detail_squadra_detail_component__ = __webpack_require__("../../../../../src/app/squadra-detail/squadra-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__slidegallery_slidegallery_component__ = __webpack_require__("../../../../../src/app/slidegallery/slidegallery.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var routes = [
    { path: '', redirectTo: '/punteggi', pathMatch: 'full' },
    { path: 'views', component: __WEBPACK_IMPORTED_MODULE_2__views_views_component__["a" /* ViewsComponent */], pathMatch: 'full' },
    { path: 'views/:obj', component: __WEBPACK_IMPORTED_MODULE_2__views_views_component__["a" /* ViewsComponent */], pathMatch: 'full' },
    { path: 'campionato', component: __WEBPACK_IMPORTED_MODULE_3__campionato_campionato_component__["a" /* CampionatoComponent */], pathMatch: 'full' },
    { path: 'squadra', component: __WEBPACK_IMPORTED_MODULE_6__squadra_squadra_component__["b" /* SquadraComponent */], pathMatch: 'full' },
    { path: 'squadra/:id', component: __WEBPACK_IMPORTED_MODULE_7__squadra_detail_squadra_detail_component__["a" /* SquadraDetailComponent */], pathMatch: 'full' },
    { path: 'campionati', component: __WEBPACK_IMPORTED_MODULE_3__campionato_campionato_component__["a" /* CampionatoComponent */], pathMatch: 'full' },
    { path: 'campionati/:id', component: __WEBPACK_IMPORTED_MODULE_4__campionato_detail_campionato_detail_component__["a" /* CampionatoDetailComponent */], pathMatch: 'full' },
    { path: 'punteggi', component: __WEBPACK_IMPORTED_MODULE_5__punteggio_punteggio_component__["a" /* PunteggioComponent */], pathMatch: 'full' },
    { path: 'gallery', component: __WEBPACK_IMPORTED_MODULE_8__slidegallery_slidegallery_component__["a" /* SlidegalleryComponent */], pathMatch: 'full' },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forRoot(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "h1 {\n    color: #369;\n    font-family: Arial, Helvetica, sans-serif;\n    font-size: 250%;\n  }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div *ngIf = \"route !== '/gallery'\">\n  <mat-grid-list cols=\"12\" rowHeight=\"2:1\">\n    <mat-grid-tile colspan=\"11\">\n      <div style=\"text-align:center\">\n        <h1>\n          {{ title }}\n        </h1>\n      </div>\n    </mat-grid-tile>\n    <mat-grid-tile colspan=\"1\">\n      <button mat-icon-button [matMenuTriggerFor]=\"menu\">\n        <mat-icon>more_vert</mat-icon>\n      </button>  \n    </mat-grid-tile>\n  </mat-grid-list>\n  <mat-menu #menu=\"matMenu\">\n    <li mat-menu-item>\n      <mat-icon>home</mat-icon>\n      <span><a routerLink=\"/\" routerLinkActive=\"active\">Home</a></span>\n    </li>    \n    <li mat-menu-item>\n      <mat-icon>star</mat-icon>\n      <span><a routerLink=\"/campionato\" routerLinkActive=\"active\">Campionato</a></span>\n    </li>\n    <li mat-menu-item>\n      <mat-icon>dialpad</mat-icon>\n      <span><a routerLink=\"/squadra\" routerLinkActive=\"active\">Squadre</a></span>\n    </li>\n    <li mat-menu-item>\n      <mat-icon>list</mat-icon>\n      <span><a routerLink=\"/punteggi\" routerLinkActive=\"active\">Classifica</a></span>\n    </li>\n  </mat-menu>\n</div>\n<router-outlet></router-outlet>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings_settings__ = __webpack_require__("../../../../../src/settings/settings.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppComponent = (function () {
    function AppComponent(router, location) {
        this.router = router;
        this.title = __WEBPACK_IMPORTED_MODULE_2__settings_settings__["a" /* APP_SETTINGS */].appTitle;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.route = location.pathname;
        console.log('DEBUG: ' + location.pathname);
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_0__angular_common__["f" /* Location */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_service__ = __webpack_require__("../../../../../src/app/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__views_views_component__ = __webpack_require__("../../../../../src/app/views/views.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__campionato_campionato_component__ = __webpack_require__("../../../../../src/app/campionato/campionato.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__campionato_detail_campionato_detail_component__ = __webpack_require__("../../../../../src/app/campionato-detail/campionato-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__punteggio_punteggio_component__ = __webpack_require__("../../../../../src/app/punteggio/punteggio.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__squadra_squadra_component__ = __webpack_require__("../../../../../src/app/squadra/squadra.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_routing_module__ = __webpack_require__("../../../../../src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__app_load_module__ = __webpack_require__("../../../../../src/app/app-load.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__custom_material_module__ = __webpack_require__("../../../../../src/app/custom-material.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__squadra_detail_squadra_detail_component__ = __webpack_require__("../../../../../src/app/squadra-detail/squadra-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_ng2_filter_pipe__ = __webpack_require__("../../../../ng2-filter-pipe/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_ng2_filter_pipe___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_ng2_filter_pipe__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pipe_filterdata_pipe__ = __webpack_require__("../../../../../src/app/pipe/filterdata.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pipe_sort_pipe__ = __webpack_require__("../../../../../src/app/pipe/sort.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_ng_simple_slideshow__ = __webpack_require__("../../../../ng-simple-slideshow/ng-simple-slideshow.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__slidegallery_slidegallery_component__ = __webpack_require__("../../../../../src/app/slidegallery/slidegallery.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__views_views_component__["a" /* ViewsComponent */],
                __WEBPACK_IMPORTED_MODULE_8__campionato_campionato_component__["a" /* CampionatoComponent */],
                __WEBPACK_IMPORTED_MODULE_9__campionato_detail_campionato_detail_component__["a" /* CampionatoDetailComponent */],
                __WEBPACK_IMPORTED_MODULE_10__punteggio_punteggio_component__["a" /* PunteggioComponent */],
                __WEBPACK_IMPORTED_MODULE_11__squadra_squadra_component__["b" /* SquadraComponent */],
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_15__squadra_detail_squadra_detail_component__["a" /* SquadraDetailComponent */],
                __WEBPACK_IMPORTED_MODULE_17__pipe_filterdata_pipe__["a" /* FilterCampionatoPipe */],
                __WEBPACK_IMPORTED_MODULE_18__pipe_sort_pipe__["b" /* SortPipe */],
                __WEBPACK_IMPORTED_MODULE_18__pipe_sort_pipe__["a" /* SortNumPipe */],
                __WEBPACK_IMPORTED_MODULE_11__squadra_squadra_component__["a" /* DialogOverviewDialog */],
                __WEBPACK_IMPORTED_MODULE_20__slidegallery_slidegallery_component__["a" /* SlidegalleryComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_12__app_routing_module__["a" /* AppRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_14__custom_material_module__["a" /* CustomMaterialModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_16_ng2_filter_pipe__["Ng2FilterPipeModule"],
                __WEBPACK_IMPORTED_MODULE_19_ng_simple_slideshow__["a" /* SlideshowModule */],
                __WEBPACK_IMPORTED_MODULE_13__app_load_module__["a" /* AppLoadModule */]
            ],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_11__squadra_squadra_component__["a" /* DialogOverviewDialog */]],
            providers: [
                __WEBPACK_IMPORTED_MODULE_3__api_service__["a" /* ApiService */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/campionato-detail/campionato-detail.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/campionato-detail/campionato-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<form *ngIf=\"campionato\" class=\"campionato-detail-form\">\n  <mat-form-field class=\"campionato-detail-full-width\">\n    <input matInput placeholder=\"Nome campionato\" [(ngModel)]=\"campionato.anno\" [value]=\"campionato?.anno\" name=\"anno\" />\n  </mat-form-field>\n  <mat-checkbox #campionatoCurrent [(ngModel)]=\"checked\" name=\"current\" [checked]=\"checked\">Corrente</mat-checkbox>\n</form>\n<div class=\"button-row\">\n  <button (click)=\"goBack()\" mat-raised-button>Go back</button>\n  <button (click)=\"save()\" mat-raised-button color=\"primary\">Save</button>\n</div>\n<h1>Squadre di questo campionato:</h1>\n<mat-list role=\"list\">\n  <mat-list-item role=\"listitem\" *ngFor=\"let squadra of squadre\">\n    <button mat-button class=\"delete\" title=\"Canella squadra\" (click)=\"delete(squadra)\"><mat-icon>backspace</mat-icon></button>\n    <a routerLink=\"/squadra/{{squadra?.id}}\">\n      {{squadra?.nome}}\n    </a>\n  </mat-list-item>\n</mat-list>\n"

/***/ }),

/***/ "../../../../../src/app/campionato-detail/campionato-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CampionatoDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_service__ = __webpack_require__("../../../../../src/app/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__campionato_campionato_model__ = __webpack_require__("../../../../../src/app/campionato/campionato.model.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CampionatoDetailComponent = (function () {
    function CampionatoDetailComponent(route, apiService, location) {
        this.route = route;
        this.apiService = apiService;
        this.location = location;
        this.checked = true;
        this.current = 0;
    }
    CampionatoDetailComponent.prototype.ngOnInit = function () {
        this.getCampionato();
        this.loadSquadre();
    };
    CampionatoDetailComponent.prototype.loadSquadre = function () {
        var _this = this;
        var id = this.route.snapshot.paramMap.get('id');
        this.apiService.search('squadre', 'campionatoId', id)
            .subscribe(function (squadre) { return _this.squadre = squadre; });
    };
    CampionatoDetailComponent.prototype.getCampionato = function () {
        var _this = this;
        var id = this.route.snapshot.paramMap.get('id');
        this.apiService.getCampionato(id)
            .subscribe(function (campionato) {
            _this.campionato = campionato;
            campionato.current === 0 ? _this.checked = false : _this.checked = true;
        });
    };
    CampionatoDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    CampionatoDetailComponent.prototype.delete = function (squadra) {
        this.squadre = this.squadre.filter(function (h) { return h !== squadra; });
        this.apiService.deleteSquadra(squadra).subscribe();
    };
    CampionatoDetailComponent.prototype.save = function () {
        var _this = this;
        this.checked == true ? this.campionato.current = 1 : this.campionato.current = 0;
        this.apiService.updateCampionato(this.campionato)
            .subscribe(function () {
            _this.apiService.setCurrentCampionato(_this.campionato).subscribe();
            _this.goBack();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4__campionato_campionato_model__["a" /* Campionato */])
    ], CampionatoDetailComponent.prototype, "campionato", void 0);
    CampionatoDetailComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-campionato-detail',
            template: __webpack_require__("../../../../../src/app/campionato-detail/campionato-detail.component.html"),
            styles: [__webpack_require__("../../../../../src/app/campionato-detail/campionato-detail.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_3__api_service__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */]])
    ], CampionatoDetailComponent);
    return CampionatoDetailComponent;
}());



/***/ }),

/***/ "../../../../../src/app/campionato/campionato.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/campionato/campionato.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-accordion>\n  <mat-expansion-panel>\n    <mat-expansion-panel-header>\n      <mat-panel-title>\n        Inserisci nuovo campionato\n      </mat-panel-title>\n    </mat-expansion-panel-header>\n      <mat-form-field class=\"campionato-detail-full-width\">\n        <input matInput #campionatoAnno placeholder=\"Nome campionato\"  required/>\n      </mat-form-field>\n      <mat-checkbox #campionatoCurrent [(ngModel)]=\"checked\" name=\"current\" value=\"1\" [checked]=\"checked\">Corrente</mat-checkbox>\n    <!-- (click) passes input value to add() and then clears the input -->\n      <button [disabled]=\"btnNewDisable\" mat-button (click)=\"add(campionatoAnno.value); campionatoAnno.value=''\">\n      <mat-icon>check</mat-icon>\n    </button>\n  </mat-expansion-panel>\n</mat-accordion>\n<mat-accordion>\n  <mat-expansion-panel>\n    <mat-expansion-panel-header>\n      <mat-panel-title>\n        Lista campionati\n      </mat-panel-title>\n    </mat-expansion-panel-header>  \n    <mat-list role=\"list\">\n      <mat-list-item role=\"listitem\" *ngFor=\"let campionato of campionati\">\n        <button mat-button class=\"delete\" title=\"Cancella campionato\" (click)=\"delete(campionato)\"><mat-icon>backspace</mat-icon></button>\n        <a routerLink=\"/campionati/{{campionato?.id}}\">\n          {{campionato?.anno}}\n        </a>\n      </mat-list-item>\n    </mat-list>\n  </mat-expansion-panel>\n</mat-accordion>\n<mat-form-field>\n  <input matInput (keyup)=\"searchTerm$.next($event.target.value)\" placeholder=\"Filter\">\n</mat-form-field>\n<mat-tab-group *ngIf=\"campionati\">\n  <mat-tab *ngFor=\"let campionato of campionati | sortnum: ['current']\" label=\"{{campionato?.anno}}\" >\n    <mat-list dense *ngIf=\"squadra\">\n      <mat-list-item *ngFor=\"let sq of squadra | filtercampionato: campionato.id\">\n        <button mat-button title=\"Aggiungi 1 punto\" (click)=\"addPunteggio(sq)\" [disabled]=\"btnDisable\"><mat-icon matListIcon>add</mat-icon></button>\n        <button mat-button title=\"Aggiungi 1 punto\" *ngIf=\"showPunteggio(sq?.id)>0\" (click)=\"minusPunteggio(sq)\" [disabled]=\"btnDisable\"><mat-icon matListIcon>remove</mat-icon></button>    \n        <a routerLink=\"/squadra/{{sq?.id}}\">\n          {{sq?.nome}} ({{showPunteggio(sq?.id)}})\n        </a>\n      </mat-list-item>\n    </mat-list>\n  </mat-tab>\n</mat-tab-group>\n"

/***/ }),

/***/ "../../../../../src/app/campionato/campionato.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CampionatoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_service__ = __webpack_require__("../../../../../src/app/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CampionatoComponent = (function () {
    function CampionatoComponent(apiService) {
        var _this = this;
        this.apiService = apiService;
        this.plusValue = '0';
        this.btnDisable = false;
        this.btnNewDisable = false;
        this.checked = true;
        this.current = 1;
        this.oldFilter = "";
        this.searchTerm$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["a" /* Subject */]();
        this.apiService.searchByForm(this.searchTerm$)
            .subscribe(function (results) {
            console.log(results);
            _this.squadra = results;
        });
    }
    CampionatoComponent.prototype.ngOnInit = function () {
        this.getCampionati();
        this.getSquadre();
        this.getPunteggi();
    };
    CampionatoComponent.prototype.getCampionati = function () {
        var _this = this;
        this.apiService.getCampionati().subscribe(function (campionati) { return _this.campionati = campionati; });
    };
    CampionatoComponent.prototype.getSquadre = function () {
        var _this = this;
        this.apiService.getSquadre().subscribe(function (squadra) { return _this.squadra = squadra; });
    };
    CampionatoComponent.prototype.getPunteggi = function () {
        var _this = this;
        this.apiService.getPunteggi().subscribe(function (p) { return _this.punteggi = p; });
    };
    CampionatoComponent.prototype.checkCampionati = function (campionato) {
        return campionato instanceof Object ? true : false;
    };
    CampionatoComponent.prototype.getPunteggio = function (id) {
        var _this = this;
        /*this.apiService.getPunteggio(squadra.id).subscribe(p => this.punteggio = p);
        return isString(this.punteggio.punteggio)  ? this.punteggio.punteggio : '0';*/
        this.apiService.search('punteggi', 'squadraId', id).subscribe(function (p) { return _this.punteggi = p; });
    };
    CampionatoComponent.prototype.showPunteggio = function (id) {
        var point;
        if (this.punteggi) {
            point = this.punteggi.filter(function (item) { return item.squadraId === id; });
            return point.length > 0 ? point[0].punteggio : '0';
        }
        else {
            return '0';
        }
    };
    CampionatoComponent.prototype.addPunteggio = function (squadra) {
        var _this = this;
        this.btnDisable = true;
        if (this.punteggi) {
            var found = this.punteggi.some(function (el) { return el.squadraId === squadra.id; });
            if (!found) {
                var point = [];
                point.push({ 'id': '', 'campionatoId': squadra.campionatoId, 'squadraId': squadra.id, 'punteggio': '1' });
                this.apiService.addPunteggio(point[0]).subscribe(function () {
                    _this.btnDisable = false;
                    _this.getPunteggi();
                });
            }
            this.punteggi.filter(function (item) { return item.squadraId === squadra.id; }).map(function (el) {
                el.punteggio = String((Number(el.punteggio) + 1));
                _this.apiService.changePunteggio(el).subscribe(function () {
                    _this.btnDisable = false;
                    _this.getPunteggi();
                });
            });
        }
    };
    CampionatoComponent.prototype.minusPunteggio = function (squadra) {
        var _this = this;
        this.btnDisable = true;
        if (this.punteggi) {
            this.punteggi.filter(function (item) { return item.squadraId === squadra.id; }).map(function (el) {
                el.punteggio = String((Number(el.punteggio) - 1));
                _this.apiService.changePunteggio(el).subscribe(function () {
                    _this.btnDisable = false;
                    _this.getPunteggi();
                });
            });
        }
    };
    CampionatoComponent.prototype.add = function (anno) {
        var _this = this;
        anno = anno.trim();
        if (!anno) {
            return;
        }
        this.btnNewDisable = true;
        this.checked ? this.current = 1 : this.current = 0;
        this.apiService.addCampionato({ 'anno': anno, 'current': this.current })
            .subscribe(function (campionati) {
            _this.apiService.setCurrentCampionato(campionati).subscribe();
            _this.campionati.push(campionati);
            _this.btnNewDisable = false;
        });
    };
    CampionatoComponent.prototype.delete = function (campionato) {
        var _this = this;
        if (campionato.current !== 1) {
            this.campionati = this.campionati.filter(function (h) { return h !== campionato; });
            this.apiService.deleteCampionato(campionato).subscribe(function () {
                _this.getCampionati();
            });
        }
        else {
            alert("Non è possibile eliminare il campionato corrente!");
        }
    };
    CampionatoComponent.prototype.applyFilter = function (filterValue) {
        /*filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        if(filterValue.length < this.oldFilter.length) {
          this.apiService.getSquadre().subscribe(squadra => {
            this.squadra = squadra.filter(e => e.nome.toLocaleLowerCase().indexOf(filterValue) > -1);
          });
        }else{
          this.squadra = this.squadra.filter(e => e.nome.toLocaleLowerCase().indexOf(filterValue) > -1);
        }
        this.oldFilter = filterValue;*/
    };
    CampionatoComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-campionato',
            template: __webpack_require__("../../../../../src/app/campionato/campionato.component.html"),
            styles: [__webpack_require__("../../../../../src/app/campionato/campionato.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__api_service__["a" /* ApiService */]])
    ], CampionatoComponent);
    return CampionatoComponent;
}());



/***/ }),

/***/ "../../../../../src/app/campionato/campionato.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Campionato; });
var Campionato = (function () {
    function Campionato() {
    }
    return Campionato;
}());



/***/ }),

/***/ "../../../../../src/app/custom-material.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomMaterialModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material_input__ = __webpack_require__("../../../material/esm5/input.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CustomMaterialModule = (function () {
    function CustomMaterialModule() {
    }
    CustomMaterialModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_2__angular_material_input__["b" /* MatInputModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MatButtonModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MatCheckboxModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["j" /* MatListModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["i" /* MatIconModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["k" /* MatMenuModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["n" /* MatSelectModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["g" /* MatExpansionModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["s" /* MatTabsModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["r" /* MatTableModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["e" /* MatDialogModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["p" /* MatSortModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["h" /* MatGridListModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["m" /* MatPaginatorModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_2__angular_material_input__["b" /* MatInputModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MatButtonModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MatCheckboxModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["j" /* MatListModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["i" /* MatIconModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["k" /* MatMenuModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["n" /* MatSelectModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["g" /* MatExpansionModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["s" /* MatTabsModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["r" /* MatTableModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["e" /* MatDialogModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["p" /* MatSortModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["h" /* MatGridListModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["m" /* MatPaginatorModule */]],
        })
    ], CustomMaterialModule);
    return CustomMaterialModule;
}());



/***/ }),

/***/ "../../../../../src/app/pipe/filterdata.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterCampionatoPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FilterCampionatoPipe = (function () {
    function FilterCampionatoPipe() {
    }
    FilterCampionatoPipe.prototype.transform = function (items, filter) {
        if (!items || !filter) {
            return {};
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(function (item) { return item.campionatoId.indexOf(filter) !== -1; });
    };
    FilterCampionatoPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'filtercampionato',
            pure: false
        })
    ], FilterCampionatoPipe);
    return FilterCampionatoPipe;
}());



/***/ }),

/***/ "../../../../../src/app/pipe/sort.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SortPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SortNumPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SortPipe = (function () {
    function SortPipe() {
    }
    SortPipe.prototype.transform = function (array, args) {
        array.sort(function (a, b) {
            if (a[args] < b[args]) {
                return -1;
            }
            else if (a[args] > b[args]) {
                return 1;
            }
            else {
                return 0;
            }
        });
        return array;
    };
    SortPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'sort',
            pure: false
        })
    ], SortPipe);
    return SortPipe;
}());

var SortNumPipe = (function () {
    function SortNumPipe() {
    }
    SortNumPipe.prototype.transform = function (array, args) {
        array.sort(function (a, b) {
            if (Number(a[args]) > Number(b[args])) {
                return -1;
            }
            else if (Number(a[args]) < Number(b[args])) {
                return 1;
            }
            else {
                return 0;
            }
        });
        return array;
    };
    SortNumPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'sortnum',
            pure: false
        })
    ], SortNumPipe);
    return SortNumPipe;
}());



/***/ }),

/***/ "../../../../../src/app/punteggio/punteggio.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".mat-grid-tile .mat-figure {\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    position: absolute;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: baseline !important;\n        -ms-flex-align: baseline !important;\n            align-items: baseline !important;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    height: 100%;\n    padding: 0;\n    margin: 0;\n}\n.punteggi-container{\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    width: 95%;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/punteggio/punteggio.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-grid-list cols=\"2\" rowHeight=\"800px\">\n  <mat-grid-tile id=\"classifica\">\n    <div *ngIf=\"dataSource\" class=\"punteggi-container mat-elevation-z8\">\n      <mat-table #table [dataSource]=\"dataSource\" matSort (matSortChange)=\"sortData($event)\" matSortActive=\"punteggio\" matSortDirection=\"desc\" matSortDisableClear>\n\n        <!--- Note that these columns can be defined in any order.\n              The actual rendered columns are set as a property on the row definition\" -->\n\n        <ng-container matColumnDef=\"seqNo\">\n            <mat-header-cell *matHeaderCellDef mat-sort-header> N. </mat-header-cell>\n            <mat-cell *matCellDef=\"let element;let i = index\"> {{ i+1 }} </mat-cell>\n          </ng-container>\n        \n\n        <ng-container matColumnDef=\"squadraId\">\n          <mat-header-cell *matHeaderCellDef mat-sort-header> Squadra </mat-header-cell>\n          <mat-cell *matCellDef=\"let element\"> {{resolveSqName(element.squadraId)}} </mat-cell>\n        </ng-container>\n\n        <ng-container matColumnDef=\"punteggio\">\n          <mat-header-cell *matHeaderCellDef mat-sort-header> Punteggio </mat-header-cell>\n          <mat-cell style=\"text-align: right;\" *matCellDef=\"let element\"> {{ element.punteggio }} </mat-cell>\n        </ng-container>\n\n        <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n        <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n      </mat-table>\n      <mat-paginator #paginator [pageSize]=\"14\"></mat-paginator>\n    </div>\n  </mat-grid-tile>\n  <mat-grid-tile>\n    <table width=\"100%\">\n      <tr>\n        <td>\n          <!-- Inizio codice ilMeteo.it -->\n          <iframe width=\"98%\" height=\"239\" scrolling=\"no\" frameborder=\"no\" noresize=\"noresize\" src=\"http://www.ilmeteo.it/box/previsioni.php?citta=6759&type=day1&width=500&ico=1&lang=ita&days=6&font=Arial&fontsize=12&bg=FFFFFF&fg=000000&bgtitle=CCD9D6&fgtitle=FFFFFF&bgtab=F0F0F0&fglink=1773C2\"></iframe>\n          <!-- Fine codice ilMeteo.it -->\n        </td>\n      </tr>\n      <tr>\n          <td>\n            <!-- Inizio codice ilMeteo.it -->\n            <iframe width=\"98%\" height=\"239\" scrolling=\"no\" frameborder=\"no\" noresize=\"noresize\" src=\"http://www.ilmeteo.it/box/previsioni.php?citta=69&type=day1&width=500&ico=1&lang=ita&days=6&font=Arial&fontsize=12&bg=FFFFFF&fg=000000&bgtitle=CCD9D6&fgtitle=FFFFFF&bgtab=F0F0F0&fglink=1773C2\"></iframe>\n            <!-- Fine codice ilMeteo.it -->            \n          </td>\n        </tr>\n    </table>\n  </mat-grid-tile>\n</mat-grid-list>"

/***/ }),

/***/ "../../../../../src/app/punteggio/punteggio.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PunteggioComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_service__ = __webpack_require__("../../../../../src/app/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_TimerObservable__ = __webpack_require__("../../../../rxjs/_esm5/observable/TimerObservable.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PunteggioComponent = (function () {
    function PunteggioComponent(apiService) {
        this.apiService = apiService;
        this.displayedColumns = ['seqNo', 'squadraId', 'punteggio'];
    }
    PunteggioComponent.prototype.ngAfterViewInit = function () {
        this.getPunteggi();
        if (this.dataSource) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sortD;
        }
    };
    PunteggioComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getPunteggi();
        this.getSquadre();
        this.getCampionati();
        this.getCurrentCampionato();
        var timer = __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_TimerObservable__["a" /* TimerObservable */].create(10000, 30000);
        var page_timer = __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_TimerObservable__["a" /* TimerObservable */].create(5000, 5000);
        this.subscription = timer.subscribe(function () {
            _this.getSquadre();
            _this.getPunteggi();
        });
        this.page_subscription = page_timer.subscribe(function () {
            _this.cnext();
        });
    };
    PunteggioComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this.page_subscription.unsubscribe();
    };
    PunteggioComponent.prototype.getPunteggi = function () {
        var _this = this;
        this.apiService.getPunteggi().subscribe(function (p) {
            _this.punteggi = p;
            _this.dataSource = new __WEBPACK_IMPORTED_MODULE_2__angular_material__["q" /* MatTableDataSource */]();
            _this.dataSource.data = p;
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sortD;
        });
    };
    PunteggioComponent.prototype.getCurrentPunteggi = function () {
        var _this = this;
        return this.punteggi.filter(function (e) { return e.campionatoId === _this.current[0].id; });
    };
    PunteggioComponent.prototype.getSquadre = function () {
        var _this = this;
        this.apiService.getSquadre().subscribe(function (s) { return _this.squadre = s; });
    };
    PunteggioComponent.prototype.getCampionati = function () {
        var _this = this;
        this.apiService.getCampionati().subscribe(function (campionati) { return _this.campionati = campionati; });
    };
    PunteggioComponent.prototype.getCurrentCampionato = function () {
        var _this = this;
        this.apiService.getCurrentCampionato().subscribe(function (c) {
            _this.current = c;
            _this.punteggi = _this.getCurrentPunteggi();
        });
    };
    PunteggioComponent.prototype.resolveSqName = function (id) {
        if (this.squadre) {
            return this.squadre.filter(function (item) { return item.id === id; }).map(function (sq) { return sq.nome; })[0];
        }
    };
    PunteggioComponent.prototype.resolveCpName = function (id) {
        if (this.campionati) {
            return this.campionati.filter(function (item) { return item.id === id; }).map(function (cp) { return cp.anno; })[0];
        }
    };
    PunteggioComponent.prototype.sortData = function (e) {
        this.dataSource.sort = this.sortD;
    };
    PunteggioComponent.prototype.cnext = function () {
        if (this.paginator.pageIndex === this.paginator.getNumberOfPages()) {
            this.paginator.firstPage();
        }
        else {
            this.paginator.nextPage();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_2__angular_material__["o" /* MatSort */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__angular_material__["o" /* MatSort */])
    ], PunteggioComponent.prototype, "sortD", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_2__angular_material__["l" /* MatPaginator */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__angular_material__["l" /* MatPaginator */])
    ], PunteggioComponent.prototype, "paginator", void 0);
    PunteggioComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-punteggio',
            template: __webpack_require__("../../../../../src/app/punteggio/punteggio.component.html"),
            styles: [__webpack_require__("../../../../../src/app/punteggio/punteggio.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__api_service__["a" /* ApiService */]])
    ], PunteggioComponent);
    return PunteggioComponent;
}());



/***/ }),

/***/ "../../../../../src/app/slidegallery/slidegallery.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "img.tumb {\n    position: fixed;\n    left: 50%;\n    top: 50%;\n    /*left: 50%;*/\n    /*height: 1080px;*/\n    /*margin-left: -150px; */\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);    \n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/slidegallery/slidegallery.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngFor=\"let li of listImage;let idx = index;\">\n    <!--<slideshow [minHeight]=\"'1080px'\" [showArrows]=\"false\" [autoPlay]=\"true\" [autoPlayInterval]=\"7777\" [imageUrls]=\"listImage\"></slideshow>-->\n    <img class=\"tumb\" (click)=\"eventClick($event);\" [style.height]=\"this.height\" [style.display]=\"idx === counter ? 'block' : 'none'\" [src]=\"li\">\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/slidegallery/slidegallery.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SlidegalleryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_service__ = __webpack_require__("../../../../../src/app/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_TimerObservable__ = __webpack_require__("../../../../rxjs/_esm5/observable/TimerObservable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_index__ = __webpack_require__("../../../../../src/settings/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SlidegalleryComponent = (function () {
    function SlidegalleryComponent(apiService) {
        this.apiService = apiService;
        this.listImage = [];
        this.test = false;
        this.height = __WEBPACK_IMPORTED_MODULE_3__settings_index__["a" /* APP_SETTINGS */].slideHeight;
        this.counter = 0;
        console.log("SIZE: " + this.height);
    }
    SlidegalleryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadImageList();
        var timer = __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_TimerObservable__["a" /* TimerObservable */].create(10000, 30000);
        this.subscription = timer.subscribe(function () {
            _this.test = false;
            _this.loadImageList();
        });
    };
    SlidegalleryComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    SlidegalleryComponent.prototype.loadImageList = function () {
        var _this = this;
        this.listImage = [];
        this.apiService.getImages('gallery1').subscribe(function (list) {
            _this.images = list;
            _this.images.map(function (i) { return _this.listImage.push(__WEBPACK_IMPORTED_MODULE_3__settings_index__["a" /* APP_SETTINGS */].imageUrl + i.name); });
            _this.test = true;
        });
    };
    SlidegalleryComponent.prototype.eventClick = function (e) {
        var total = this.images.length - 1;
        this.counter = e.layerX < 150 ? this.click_prev(total) : this.click_next(total);
    };
    SlidegalleryComponent.prototype.click_next = function (total) {
        return this.counter < total ? this.counter = this.counter + 1 : 0;
    };
    SlidegalleryComponent.prototype.click_prev = function (total) {
        return this.counter = 0 ? this.counter = this.counter - 1 : total;
    };
    SlidegalleryComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-slidegallery',
            template: __webpack_require__("../../../../../src/app/slidegallery/slidegallery.component.html"),
            styles: [__webpack_require__("../../../../../src/app/slidegallery/slidegallery.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__api_service__["a" /* ApiService */]])
    ], SlidegalleryComponent);
    return SlidegalleryComponent;
}());



/***/ }),

/***/ "../../../../../src/app/squadra-detail/squadra-detail.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".button-row{\n    \n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/squadra-detail/squadra-detail.component.html":
/***/ (function(module, exports) {

module.exports = "\n<form *ngIf=\"squadra\" class=\"squadra-detail-form\">\n  <mat-form-field>\n    <mat-select placeholder=\"Campionato\" [(ngModel)]=\"squadra.campionatoId\" name=\"campionatoId\" [(value)]=\"selected\">\n      <mat-option *ngFor=\"let campionato of campionati\" [value]=\"campionato.id\">\n        {{ campionato.anno }}\n      </mat-option>\n    </mat-select>\n  </mat-form-field>\n<!--  <mat-form-field class=\"squadra-detail-full-width\">\n    <input matInput placeholder=\"Id Campionato\" [(ngModel)]=\"squadra.campionatoId\" [value]=\"squadra?.campionatoId\" name=\"campionatoId\" />\n  </mat-form-field>-->\n  <mat-form-field class=\"squadra-detail-full-width\">\n    <input matInput placeholder=\"Nome squadra\" [(ngModel)]=\"squadra.nome\" [value]=\"squadra?.nome\" name=\"nome\" />\n  </mat-form-field>\n</form>\n\n<div class=\"button-row\">\n    <button (click)=\"goBack()\" mat-raised-button>Go back</button>\n    <button (click)=\"save()\" mat-raised-button color=\"primary\">Save</button>\n  </div>\n"

/***/ }),

/***/ "../../../../../src/app/squadra-detail/squadra-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SquadraDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_service__ = __webpack_require__("../../../../../src/app/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__squadra_squadra_model__ = __webpack_require__("../../../../../src/app/squadra/squadra.model.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SquadraDetailComponent = (function () {
    function SquadraDetailComponent(route, apiService, location) {
        this.route = route;
        this.apiService = apiService;
        this.location = location;
    }
    SquadraDetailComponent.prototype.ngOnInit = function () {
        this.getSquadra();
        this.getCampionati();
    };
    SquadraDetailComponent.prototype.getCampionati = function () {
        var _this = this;
        this.apiService.getCampionati().subscribe(function (campionati) { return _this.campionati = campionati; });
    };
    SquadraDetailComponent.prototype.getSquadra = function () {
        var _this = this;
        var id = this.route.snapshot.paramMap.get('id');
        this.apiService.getSquadra(id)
            .subscribe(function (squadra) { return _this.squadra = squadra; });
    };
    SquadraDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    SquadraDetailComponent.prototype.save = function () {
        var _this = this;
        console.log(this.squadra);
        this.apiService.updateSquadra(this.squadra)
            .subscribe(function () { return _this.goBack(); });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4__squadra_squadra_model__["a" /* Squadra */])
    ], SquadraDetailComponent.prototype, "squadra", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Array)
    ], SquadraDetailComponent.prototype, "campionati", void 0);
    SquadraDetailComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-squadra-detail',
            template: __webpack_require__("../../../../../src/app/squadra-detail/squadra-detail.component.html"),
            styles: [__webpack_require__("../../../../../src/app/squadra-detail/squadra-detail.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_3__api_service__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */]])
    ], SquadraDetailComponent);
    return SquadraDetailComponent;
}());



/***/ }),

/***/ "../../../../../src/app/squadra/dialog-dialog.html":
/***/ (function(module, exports) {

module.exports = "<h2 mat-dialog-title>Cancellazione squadra</h2>\n<mat-dialog-content>Sei sicuro di voler cancellare la squadra: {{data?.nome}}?</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button mat-dialog-close>No</button>\n  <!-- The mat-dialog-close directive optionally accepts a value as a result for the dialog. -->\n  <button mat-button [mat-dialog-close]=\"true\">Si</button>\n</mat-dialog-actions>"

/***/ }),

/***/ "../../../../../src/app/squadra/squadra.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "mat-list-item{\n    border-bottom: 1px solid #ddd;\n}\nmat-list-item-content a{\n    font-size: 20px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/squadra/squadra.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-accordion>\n  <mat-expansion-panel>\n    <mat-expansion-panel-header>\n      <mat-panel-title>\n        Inserisci nuova squadra\n      </mat-panel-title>\n    </mat-expansion-panel-header>\n    <mat-form-field>\n      <mat-select #squadraCampionato placeholder=\"Campionato\" name=\"campionatoId\" required>\n        <mat-option *ngFor=\"let campionato of campionati\" [value]=\"campionato.id\">\n          {{ campionato.anno }}\n        </mat-option>\n      </mat-select>\n    </mat-form-field>\n    <mat-form-field class=\"squadra-detail-full-width\">\n      <input placeholder=\"Nome squadra\" matInput #squadraName  required/>\n    </mat-form-field>\n    <!-- (click) passes input value to add() and then clears the input -->\n    <button mat-button (click)=\"add(squadraName.value, squadraCampionato.value); squadraName.value=''; squadraCampionato.value=''\">\n      <mat-icon>check</mat-icon>\n    </button>\n  </mat-expansion-panel>\n<mat-accordion>\n  <mat-accordion>\n    <mat-expansion-panel  [expanded]=\"true\">\n      <mat-expansion-panel-header>\n        <mat-panel-title>\n          Lista squadre\n        </mat-panel-title>\n      </mat-expansion-panel-header>      \n      <mat-list role=\"list\">\n        <mat-list-item role=\"listitem\" *ngFor=\"let squadre of squadre\">\n          <button mat-button class=\"delete\" title=\"Cancella squadra\" (click)=\"openDialog(squadre)\"><mat-icon>clear</mat-icon></button>\n          <a routerLink=\"/squadra/{{squadre?.id}}\">\n            {{squadre?.nome}}\n          </a>\n        </mat-list-item>\n      </mat-list>\n    </mat-expansion-panel>\n</mat-accordion>"

/***/ }),

/***/ "../../../../../src/app/squadra/squadra.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SquadraComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DialogOverviewDialog; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_service__ = __webpack_require__("../../../../../src/app/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var SquadraComponent = (function () {
    function SquadraComponent(apiService, dialog) {
        this.apiService = apiService;
        this.dialog = dialog;
    }
    SquadraComponent.prototype.ngOnInit = function () {
        this.getSquadre();
        this.getCampionati();
    };
    SquadraComponent.prototype.getCampionati = function () {
        var _this = this;
        this.apiService.getCampionati().subscribe(function (campionati) { return _this.campionati = campionati; });
    };
    SquadraComponent.prototype.getSquadre = function () {
        var _this = this;
        this.apiService.getSquadre().subscribe(function (squadre) { return _this.squadre = squadre; });
    };
    SquadraComponent.prototype.add = function (nome, campionatoId) {
        var _this = this;
        nome = nome.trim();
        if (!nome) {
            return;
        }
        this.apiService.addSquadra({ nome: nome, campionatoId: campionatoId })
            .subscribe(function (squadra) {
            _this.squadre.push(squadra);
        });
    };
    SquadraComponent.prototype.delete = function (squadra) {
        this.squadre = this.squadre.filter(function (h) { return h !== squadra; });
        this.apiService.deleteSquadra(squadra).subscribe(function (sq) { return console.log(sq); }, function (err) { return console.log(err); }
        //() => this.apiService.deleteSquadra(squadra).subscribe()
        );
    };
    SquadraComponent.prototype.openDialog = function (squadra) {
        var _this = this;
        var dialogRef = this.dialog.open(DialogOverviewDialog, {
            width: '250px',
            data: { nome: squadra.nome }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.delete(squadra);
            }
        });
    };
    SquadraComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-squadra',
            template: __webpack_require__("../../../../../src/app/squadra/squadra.component.html"),
            styles: [__webpack_require__("../../../../../src/app/squadra/squadra.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__api_service__["a" /* ApiService */], __WEBPACK_IMPORTED_MODULE_2__angular_material__["d" /* MatDialog */]])
    ], SquadraComponent);
    return SquadraComponent;
}());

var DialogOverviewDialog = (function () {
    function DialogOverviewDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    DialogOverviewDialog.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    DialogOverviewDialog = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-dialog-dialog',
            template: __webpack_require__("../../../../../src/app/squadra/dialog-dialog.html"),
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_2__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_material__["f" /* MatDialogRef */], Object])
    ], DialogOverviewDialog);
    return DialogOverviewDialog;
}());



/***/ }),

/***/ "../../../../../src/app/squadra/squadra.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Squadra; });
var Squadra = (function () {
    function Squadra() {
    }
    return Squadra;
}());



/***/ }),

/***/ "../../../../../src/app/views/views.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/views/views.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  views works!<br/>\n  <a href=\"javascript:void(0);\" (click)=\"onClick()\">Click here!</a><br/>\n  Object to view: {{this.obj}}\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/views/views.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ViewsComponent = (function () {
    function ViewsComponent(route, router) {
        this.route = route;
        this.router = router;
        this.obj = "First value";
    }
    ViewsComponent.prototype.ngOnInit = function () {
        if (this.route.snapshot.params["obj"]) {
            this.obj = this.route.snapshot.params["obj"];
        }
    };
    ViewsComponent.prototype.onClick = function () {
        (this.obj == "Change") ? this.obj = "test" : this.obj = "Change";
    };
    ViewsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-views',
            template: __webpack_require__("../../../../../src/app/views/views.component.html"),
            styles: [__webpack_require__("../../../../../src/app/views/views.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]])
    ], ViewsComponent);
    return ViewsComponent;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_hammerjs__ = __webpack_require__("../../../../hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_hammerjs__);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ "../../../../../src/settings/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings__ = __webpack_require__("../../../../../src/settings/settings.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__settings__["a"]; });



/***/ }),

/***/ "../../../../../src/settings/settings.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APP_SETTINGS; });
var APP_SETTINGS = {
    appTitle: '',
    apiUrl: '',
    imageUrl: '',
    slideHeight: ''
};


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map
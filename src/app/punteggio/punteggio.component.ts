import { Component, OnInit, ViewChild } from '@angular/core';
import { Punteggio, Classifica } from './punteggio.model';
import { Campionato } from '../campionato/campionato.model';
import { Squadra } from '../squadra/squadra.model';
import { ApiService } from '../api.service';

import { MatTableDataSource, MatSort, MatSortable, MatPaginator } from '@angular/material';
import { Element } from '@angular/compiler';
import { AfterViewInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { DataSource } from '@angular/cdk/collections';
import { Subscription } from 'rxjs/Subscription';
import { TimerObservable } from "rxjs/observable/TimerObservable";



export interface Element {
  'id': string;
  'punteggio': string;
  'campionatoId': string;
  'squadraId': string;
}

@Component({
  selector: 'app-punteggio',
  templateUrl: './punteggio.component.html',
  styleUrls: ['./punteggio.component.css']
})

export class PunteggioComponent implements OnInit, AfterViewInit, OnDestroy {
  public punteggi: Classifica[];
  public squadre: Squadra[];
  public campionati: Campionato[];
  public current: Campionato;
  displayedColumns = ['ordine', 'squadraId', 'punteggio'];
  dataSource: MatTableDataSource<Punteggio>;
  private subscription: Subscription;
  private page_subscription: Subscription;

  @ViewChild(MatSort) sortD: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private apiService: ApiService) {
  }

  ngAfterViewInit() {
    this.getCurrentCampionato();
    if ( this.dataSource ) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sortD;
    }
  }

  ngOnInit() {
    this.getSquadre();
    this.getCampionati();
    this.getCurrentCampionato();
    let timer = TimerObservable.create(1000, 30000);
    let page_timer = TimerObservable.create(5000, 5000);
    this.subscription = timer.subscribe( () => {
      this.getSquadre();
      this.getPunteggi();
    });
    this.page_subscription = page_timer.subscribe( () => {
      this.cnext();
    });


  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.page_subscription.unsubscribe();
  }
  getPunteggi(): void {
    this.apiService.getPunteggiById(this.current[0].id).subscribe(p => {
      this.punteggi = p;
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = p;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sortD;
    });
  }
  getCurrentPunteggi() {
    return this.punteggi.filter(e => e.campionatoId === this.current[0].id);
  }
  getSquadre(): void {
    this.apiService.getSquadre().subscribe(s => this.squadre = s);
  }
  getCampionati(): void {
    this.apiService.getCampionati().subscribe(campionati => this.campionati = campionati);
  }
  getCurrentCampionato() {
    this.apiService.getCurrentCampionato().subscribe((c) => {
      this.current = c;
      //this.punteggi = this.getCurrentPunteggi();
      this.getPunteggi();
    });
  }
  resolveSqName(id) {
    if (this.squadre) {
      return this.squadre.filter(item => item.id === id).map(sq => sq.nome)[0];
    }
  }
  resolveCpName(id) {
    if (this.campionati) {
      return this.campionati.filter(item => item.id === id).map(cp => cp.anno)[0];
    }
  }
  sortData(e) {
    this.dataSource.sort = this.sortD;
  }
  cnext(){
    if(this.paginator.pageIndex === this.paginator.getNumberOfPages()){
      this.paginator.firstPage();
    }else{
      this.paginator.nextPage();
    }
  }
}
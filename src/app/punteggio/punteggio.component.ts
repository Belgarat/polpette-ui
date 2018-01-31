import { Component, OnInit } from '@angular/core';
import { Punteggio } from './punteggio.model';
import { Campionato } from '../campionato/campionato.model';
import { Squadra } from '../squadra/squadra.model';
import { ApiService } from '../api.service';

import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-punteggio',
  templateUrl: './punteggio.component.html',
  styleUrls: ['./punteggio.component.css']
})
export class PunteggioComponent implements OnInit {
  public punteggi: Punteggio[];
  public squadre: Squadra[];
  public campionati: Campionato[];
  public current: Campionato;
  displayedColumns = ['punteggio'];
  dataSource = new MatTableDataSource<Element>(this.punteggi);


  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.getPunteggi();
    this.getSquadre();
    this.getCampionati();
    this.getCurrentCampionato();
  }
  getPunteggi(): void {
    this.apiService.getPunteggi().subscribe(p => this.punteggi = p);
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
      this.punteggi = this.getCurrentPunteggi();
    });
  }
  resolveSqName(id) {
    if(this.squadre){
      return this.squadre.filter(item => item.id === id).map(sq => sq.nome)[0];
    }
  }
  resolveCpName(id) {
    if(this.campionati){
      return this.campionati.filter(item => item.id === id).map(cp => cp.anno)[0];
    }
  }
}

export interface Element {
  punteggio: string;
}

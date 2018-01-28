import { Data } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Campionato } from './campionato.model';
import { Squadra } from '../squadra/squadra.model';
import { Punteggio } from './../punteggio/punteggio.model';
import { ApiService } from '../api.service';
import { isString } from 'util';

@Component({
  selector: 'app-campionato',
  templateUrl: './campionato.component.html',
  styleUrls: ['./campionato.component.css']
})
export class CampionatoComponent implements OnInit {
  public campionati: Campionato[];
  public squadra: Squadra[];
  public punteggi: Punteggio[];
  private currentPoint: Punteggio[];

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.getCampionati();
    this.getSquadre();
    this.getPunteggi();
  }

  getCampionati(): void {
    this.apiService.getCampionati().subscribe(campionati => this.campionati = campionati);
  }

  getSquadre(): void {
    this.apiService.getSquadre().subscribe(squadra => this.squadra = squadra);
  }

  getPunteggi(): void {
    this.apiService.getPunteggi().subscribe(p => this.punteggi = p);
  }

  checkCampionati(campionato): boolean {
    return campionato instanceof Object ? true : false;
  }

  getPunteggio(id: string) {
    /*this.apiService.getPunteggio(squadra.id).subscribe(p => this.punteggio = p);
    return isString(this.punteggio.punteggio)  ? this.punteggio.punteggio : '0';*/
    this.apiService.search('punteggi', 'squadraId', id).subscribe(p => this.punteggi = p);
  }

  showPunteggio(id: string): string {
    let point: Punteggio[];
    if (this.punteggi) {
      point = this.punteggi.filter(item => item.squadraId === id);
      return point.length > 0  ? point[0].punteggio : '0';
    } else {
      return '0';
    }
  }

  addPunteggio(squadra): any {
    /*let point: Punteggio[];*/
    if (this.punteggi) {
      let found = this.punteggi.some(el => el.squadraId === squadra.id);
      if (!found) {
        let point: Punteggio[] = [];
        point.push(Object({'campionatoId': squadra.campionatoId, 'squadraId': squadra.id, 'punteggio': '0' }));
        this.apiService.addPunteggio(point[0]);
      }
      this.punteggi.filter(item => item.squadraId === squadra.id).map((el) => {
        el.punteggio = String((Number(el.punteggio) + 1));
        this.apiService.changePunteggio(el).subscribe();
      });
      /*if (this.currentPoint.length === 0) {
        console.log(this.currentPoint);
        this.currentPoint.push(Object({'campionatoId': squadra.campionatoId, 'squadraId': squadra.id, 'punteggio': '0' }));
        this.apiService.addPunteggio(this.currentPoint[0]);
        return 0;
      } else {
        let num: number = (Number(point[0].punteggio) + 1);
        point[0].punteggio = String(num);
        console.log('Aggiornato', point);
        this.apiService.changePunteggio(point[0]).subscribe();
        return 0;
      }*/
    }
  }

  add(anno: string, id: number): void {
    anno = anno.trim();
    if (!anno) { return; }
    this.apiService.addCampionato({ anno } as Campionato)
      .subscribe(campionati => {
        this.campionati.push(campionati);
      });
  }

  delete(campionato: Campionato): void {
    this.campionati = this.campionati.filter(h => h !== campionato);
    this.apiService.deleteCampionato(campionato).subscribe();
  }


}

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

  private plusValue: string = '0';
  public btnDisable = false;
  public btnNewDisable = false;
  public checked = true;
  public current = 1;

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
    this.btnDisable = true;
    if (this.punteggi) {
      let found = this.punteggi.some(el => el.squadraId === squadra.id);
      if (!found) {
        let point: Punteggio[] = [];
        point.push({'id': '', 'campionatoId': squadra.campionatoId, 'squadraId': squadra.id, 'punteggio': '1' });
        this.apiService.addPunteggio(point[0]).subscribe(() => { 
          this.btnDisable = false;
          this.getPunteggi();
        });
      }
      this.punteggi.filter(item => item.squadraId === squadra.id).map((el) => {
        el.punteggio = String((Number(el.punteggio) + 1));
        this.apiService.changePunteggio(el).subscribe(() => {
          this.btnDisable = false;
          this.getPunteggi();
        });
      });
    }
  }

  minusPunteggio(squadra): any {
    this.btnDisable = true;
    if (this.punteggi) {
      this.punteggi.filter(item => item.squadraId === squadra.id).map((el) => {
        el.punteggio = String((Number(el.punteggio) - 1));
        this.apiService.changePunteggio(el).subscribe(() => {
          this.btnDisable = false;
          this.getPunteggi();
        });
      });
    }
  }

  add(anno: string): void {
    anno = anno.trim();
    if (!anno) { return; }
    this.btnNewDisable = true;
    this.checked ? this.current = 1 : this.current = 0;
    this.apiService.addCampionato({ 'anno': anno, 'current': this.current } as Campionato)
      .subscribe(campionati => {
        this.apiService.setCurrentCampionato(campionati).subscribe();
        this.campionati.push(campionati);
        this.btnNewDisable = false;
      });
  }

  delete(campionato: Campionato): void {
    if(campionato.current !== 1){
      this.campionati = this.campionati.filter(h => h !== campionato);
      this.apiService.deleteCampionato(campionato).subscribe(() => {
        this.getCampionati();
      });
    }else{
      alert("Non è possibile eliminare il campionato corrente!");
    }
  }


}

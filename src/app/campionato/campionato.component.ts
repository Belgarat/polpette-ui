import { Component, OnInit } from '@angular/core';
import { Campionato } from './campionato.model';
import { Squadra } from '../squadra/squadra.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-campionato',
  templateUrl: './campionato.component.html',
  styleUrls: ['./campionato.component.css']
})
export class CampionatoComponent implements OnInit {
  public campionati: Campionato[];
  public squadra: Squadra[];
  private filter: any = { campionatoId: '' };

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.getCampionati();
    this.apiService.getSquadre().subscribe(squadra => this.squadra = squadra);
  }

  getCampionati(): void {
    this.apiService.getCampionati().subscribe(campionati => this.campionati = campionati);
  }

  add(anno: string, id: number): void {
    anno = anno.trim();
    if (!anno) { return; }
    this.apiService.addCampionato({ anno } as Campionato)
      .subscribe(campionati => {
        this.campionati.push(campionati);
      });
  }

  filter_squadra(campionato){
    return this.squadra.filter( x => x.campionatoId == campionato.id );
  }

  delete(campionato: Campionato): void {
    this.campionati = this.campionati.filter(h => h !== campionato);
    this.apiService.deleteCampionato(campionato).subscribe();
  }


}

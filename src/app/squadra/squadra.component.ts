import { Component, OnInit } from '@angular/core';
import { Squadra } from './squadra.model';
import { Campionato } from '../campionato/campionato.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-squadra',
  templateUrl: './squadra.component.html',
  styleUrls: ['./squadra.component.css']
})
export class SquadraComponent implements OnInit {
  public squadre: Squadra[];
  public campionati: Campionato[]

  constructor(private apiService: ApiService) {
    
  }

  ngOnInit() {
    this.getSquadre();
    this.getCampionati();
  }

  getCampionati(): void {
    this.apiService.getCampionati().subscribe(campionati => this.campionati = campionati);
  }

  getSquadre(): void {
    this.apiService.getSquadre().subscribe(squadre => this.squadre = squadre);
  }

  add(nome: string, campionatoId: string): void {
    nome = nome.trim();
    if (!nome) { return; }
    this.apiService.addSquadra({ nome, campionatoId } as Squadra)
      .subscribe(squadra => {
        this.squadre.push(squadra);
      });
  }

  delete(squadra: Squadra): void {
    this.squadre = this.squadre.filter(h => h !== squadra);
    this.apiService.deleteSquadra(squadra).subscribe();
  }

}

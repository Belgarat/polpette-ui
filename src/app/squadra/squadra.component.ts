import { Component, OnInit } from '@angular/core';
import { Squadra } from './squadra.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-squadra',
  templateUrl: './squadra.component.html',
  styleUrls: ['./squadra.component.css']
})
export class SquadraComponent implements OnInit {
  public squadre: Squadra[];

  constructor(private apiService: ApiService) {
    
  }

  ngOnInit() {
    this.getSquadre();
  }

  getSquadre(): void {
    this.apiService.getSquadre().subscribe(squadre => this.squadre = squadre);
  }

  add(nome: string, campionatoId: string, id: number): void {
    nome = nome.trim();
    campionatoId = "ciaociao";
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

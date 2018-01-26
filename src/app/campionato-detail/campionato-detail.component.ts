import { Squadra } from './../squadra/squadra.model';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ApiService } from '../api.service';
import { Campionato } from '../campionato/campionato.model';

@Component({
  selector: 'app-campionato-detail',
  templateUrl: './campionato-detail.component.html',
  styleUrls: ['./campionato-detail.component.css']
})
export class CampionatoDetailComponent implements OnInit {
  @Input() campionato: Campionato;
  private squadre: Squadra[];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getCampionato();
    this.loadSquadre();
  }

  loadSquadre(): void{
    const id = this.route.snapshot.paramMap.get('id');
    this.apiService.search('squadre','campionatoId', id)
      .subscribe(squadre => this.squadre = squadre);
  }

  getCampionato(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.apiService.getCampionato(id)
      .subscribe(campionato => this.campionato = campionato);
  }

  goBack(): void {
    this.location.back();
  }

  delete(squadra: Squadra): void {
    this.squadre = this.squadre.filter(h => h !== squadra);
    this.apiService.deleteSquadra(squadra).subscribe();
  }

 save(): void {
    this.apiService.updateCampionato(this.campionato)
      .subscribe(() => this.goBack());
  }
}

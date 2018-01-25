import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ApiService } from '../api.service';
import { Squadra } from '../squadra/squadra.model';
import { Campionato } from '../campionato/campionato.model';

@Component({
  selector: 'app-squadra-detail',
  templateUrl: './squadra-detail.component.html',
  styleUrls: ['./squadra-detail.component.css']
})
export class SquadraDetailComponent implements OnInit {
  @Input() squadra: Squadra;
  @Input() campionati: Campionato[];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getSquadra();
    this.getCampionati();
  }

  getCampionati(): void {
    this.apiService.getCampionati().subscribe(campionati => this.campionati = campionati);
  }

  getSquadra(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.apiService.getSquadra(id)
      .subscribe(squadra => this.squadra = squadra);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    console.log(this.squadra);
    this.apiService.updateSquadra(this.squadra)
      .subscribe(() => this.goBack());
  }

}

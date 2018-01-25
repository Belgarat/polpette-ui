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

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getCampionato();
  }

  getCampionato(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.apiService.getCampionato(id)
      .subscribe(campionato => this.campionato = campionato);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.apiService.updateCampionato(this.campionato)
      .subscribe(() => this.goBack());
  }
}

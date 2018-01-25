import { Component, OnInit } from '@angular/core';
import { Campionato} from './campionato.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-campionato',
  templateUrl: './campionato.component.html',
  styleUrls: ['./campionato.component.css']
})
export class CampionatoComponent implements OnInit {
  public campionati: Campionato[];

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.getCampionati();
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

  delete(campionato: Campionato): void {
    this.campionati = this.campionati.filter(h => h !== campionato);
    this.apiService.deleteCampionato(campionato).subscribe();
  }


}

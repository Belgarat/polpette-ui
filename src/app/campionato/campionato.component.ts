import { Component, OnInit } from '@angular/core';
import { Campionato} from './campionato.model';

@Component({
  selector: 'app-campionato',
  templateUrl: './campionato.component.html',
  styleUrls: ['./campionato.component.css']
})
export class CampionatoComponent implements OnInit {
  public camp: Campionato;

  constructor() {
    this.camp = new Campionato();
    this.camp.anno = 2014;
  }

  ngOnInit() {
  }

}

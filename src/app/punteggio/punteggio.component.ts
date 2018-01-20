import { Component, OnInit } from '@angular/core';
import { Punteggio } from './punteggio.model';

@Component({
  selector: 'app-punteggio',
  templateUrl: './punteggio.component.html',
  styleUrls: ['./punteggio.component.css']
})
export class PunteggioComponent implements OnInit {
  public punteggio: Punteggio;

  constructor() {
    this.punteggio = new Punteggio();
  }

  ngOnInit() {
  }

}

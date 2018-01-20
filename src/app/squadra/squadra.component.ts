import { Component, OnInit } from '@angular/core';
import { Squadra } from './squadra.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-squadra',
  templateUrl: './squadra.component.html',
  styleUrls: ['./squadra.component.css']
})
export class SquadraComponent implements OnInit {
  public sq: Squadra;

  constructor(private apiService: ApiService) {
    this.sq = new Squadra();
  }

  ngOnInit() {
    console.log(this.apiService.list('squadra'));
  }

}

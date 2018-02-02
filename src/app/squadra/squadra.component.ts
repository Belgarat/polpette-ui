import { Component, OnInit, Inject } from '@angular/core';
import { Squadra } from './squadra.model';
import { Campionato } from '../campionato/campionato.model';
import { ApiService } from '../api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-squadra',
  templateUrl: './squadra.component.html',
  styleUrls: ['./squadra.component.css']
})
export class SquadraComponent implements OnInit {
  public squadre: Squadra[];
  public campionati: Campionato[]

  constructor(private apiService: ApiService, public dialog: MatDialog) {
    
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

  openDialog(squadra): void {
    let dialogRef = this.dialog.open(DialogOverviewDialog, {
      width: '250px',
      data: { nome: squadra.nome }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.delete(squadra);
      }
    });
  }

}

@Component({
  selector: 'dialog-dialog',
  templateUrl: './dialog-dialog.html',
})
export class DialogOverviewDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
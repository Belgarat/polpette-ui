import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { ViewsComponent } from './views/views.component';
import { CampionatoComponent } from './campionato/campionato.component';
import { CampionatoDetailComponent } from './campionato-detail/campionato-detail.component';
import { PunteggioComponent } from './punteggio/punteggio.component';
import { SquadraComponent } from './squadra/squadra.component';

import { AppRoutingModule } from './app-routing.module';
import { CustomMaterialModule } from './custom-material.module';
import { SquadraDetailComponent } from './squadra-detail/squadra-detail.component';

import { Ng2FilterPipeModule } from 'ng2-filter-pipe';

@NgModule({
  declarations: [
    ViewsComponent,
    CampionatoComponent,
    CampionatoDetailComponent,
    PunteggioComponent,
    SquadraComponent,
    AppComponent,
    SquadraDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomMaterialModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    Ng2FilterPipeModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from './api.service';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';

import { ViewsComponent } from './views/views.component';
import { CampionatoComponent } from './campionato/campionato.component';
import { PunteggioComponent } from './punteggio/punteggio.component';
import { SquadraComponent } from './squadra/squadra.component';

import { AppRoutingModule } from './app-routing.module';
import { SquadraDetailComponent } from './squadra-detail/squadra-detail.component';

@NgModule({
  declarations: [
    ViewsComponent,
    CampionatoComponent,
    PunteggioComponent,
    SquadraComponent,
    AppComponent,
    SquadraDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

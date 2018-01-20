import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ViewsComponent } from './views/views.component';

import { ApiService } from './api.service';
import { CampionatoComponent } from './campionato/campionato.component';
import { PunteggioComponent } from './punteggio/punteggio.component';
import { SquadraComponent } from './squadra/squadra.component';

const appRoutes: Routes = [
  { path: 'views', component: ViewsComponent,  pathMatch: 'full' },
  { path: 'views/:obj', component: ViewsComponent, pathMatch: 'full' },
  { path: 'campionato', component: CampionatoComponent,  pathMatch: 'full' },
  { path: 'squadra', component: SquadraComponent,  pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    ViewsComponent,
    CampionatoComponent,
    PunteggioComponent,
    SquadraComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewsComponent } from './views/views.component';

import { CampionatoComponent } from './campionato/campionato.component';
import { CampionatoDetailComponent } from './campionato-detail/campionato-detail.component';
import { PunteggioComponent } from './punteggio/punteggio.component';
import { SquadraComponent } from './squadra/squadra.component';
import { SquadraDetailComponent } from './squadra-detail/squadra-detail.component';
 
const routes: Routes = [
    { path: 'views', component: ViewsComponent,  pathMatch: 'full' },
    { path: 'views/:obj', component: ViewsComponent, pathMatch: 'full' },
    { path: 'campionato', component: CampionatoComponent,  pathMatch: 'full' },
    { path: 'squadra', component: SquadraComponent,  pathMatch: 'full' },
    { path: 'squadra/:id', component: SquadraDetailComponent,  pathMatch: 'full' },
    { path: 'campionati', component: CampionatoComponent,  pathMatch: 'full' },
    { path: 'campionati/:id', component: CampionatoDetailComponent,  pathMatch: 'full' },
  ];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

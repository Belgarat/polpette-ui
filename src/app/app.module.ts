import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { ViewsComponent } from './views/views.component';
import { CampionatoComponent } from './campionato/campionato.component';
import { CampionatoDetailComponent } from './campionato-detail/campionato-detail.component';
import { PunteggioComponent } from './punteggio/punteggio.component';
import { SquadraComponent, DialogOverviewDialog } from './squadra/squadra.component';
import { RssFeedComponent } from './rss-feed/rss-feed.component';

import { AppRoutingModule } from './app-routing.module';
import { AppLoadModule } from './app-load.module';
import { CustomMaterialModule } from './custom-material.module';
import { SquadraDetailComponent } from './squadra-detail/squadra-detail.component';

import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { FilterCampionatoPipe } from './pipe/filterdata.pipe';
import { SortPipe } from './pipe/sort.pipe';
import { SortNumPipe } from './pipe/sort.pipe';

import { SlideshowModule } from 'ng-simple-slideshow';
import { SlidegalleryComponent } from './slidegallery/slidegallery.component';


@NgModule({
  declarations: [
    ViewsComponent,
    CampionatoComponent,
    CampionatoDetailComponent,
    PunteggioComponent,
    SquadraComponent,
    AppComponent,
    SquadraDetailComponent,
    FilterCampionatoPipe,
    SortPipe,
    SortNumPipe,
    DialogOverviewDialog,
    SlidegalleryComponent,
    RssFeedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomMaterialModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    Ng2FilterPipeModule,
    SlideshowModule,
    AppLoadModule

  ],
  entryComponents: [ DialogOverviewDialog ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

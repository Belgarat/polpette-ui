import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ViewsComponent } from './views/views.component';

import { ApiService } from './api.service';

const appRoutes: Routes = [
  { path: 'views', component: ViewsComponent,  pathMatch: 'full' },
  { path: 'views/:obj', component: ViewsComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    ViewsComponent
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

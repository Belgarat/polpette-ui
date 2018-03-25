import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { APP_SETTINGS } from './../settings/settings';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = APP_SETTINGS.appTitle;
  public route: string;

  constructor(private router: ActivatedRoute, location: Location) {}

  ngOnInit() {
    this.route = location.pathname;
    console.log('DEBUG: ' + location.pathname);
  }

}

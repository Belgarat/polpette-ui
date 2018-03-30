import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { APP_SETTINGS } from '../settings';

@Injectable()
export class AppLoadService {

  constructor(private httpClient: HttpClient) { }

  initializeApp(): Promise<any> {
    return new Promise((resolve, reject) => {
          console.log(`initializeApp:: inside promise`);

          setTimeout(() => {
            console.log(`initializeApp:: inside setTimeout`);
            // doing something

            resolve();
          }, 3000);
        });
  }

  getSettings(): Promise<any> {
    console.log(`getSettings:: before http.get call`);
    const promise = this.httpClient.get('../assets/config.json')
      .toPromise()
      .then(settings => {
        console.log(`Settings from API: `, settings);

        APP_SETTINGS.appTitle = settings[0].appTitle;
        APP_SETTINGS.apiUrl = settings[0].apiUrl;
        APP_SETTINGS.imageUrl = settings[0].imageUrl;
        APP_SETTINGS.slideHeight = settings[0].slideHeight;
        APP_SETTINGS.enableFeed = settings[0].enableFeed;

        console.log(`APP_SETTINGS: `, APP_SETTINGS);

        return settings;
      });

    return promise;
  }
}
import { map } from 'rxjs/operators';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';
import { Slidegallery } from '../slidegallery/slidegallery.model';
import { Subscription } from 'rxjs/Subscription';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { APP_SETTINGS } from '../../settings/index';

@Component({
  selector: 'app-slidegallery',
  templateUrl: './slidegallery.component.html',
  styleUrls: ['./slidegallery.component.css']
})

export class SlidegalleryComponent implements OnInit, OnDestroy {

  images: Slidegallery[];
  public listImage = [];
  public test = false;
  public subscription: Subscription;
  public height = APP_SETTINGS.slideHeight;
  counter = 0;

  constructor(private apiService: ApiService) { 
      console.log("SIZE: " + this.height);
  }

  ngOnInit() {
    this.loadImageList();
    const timer = TimerObservable.create(10000, 30000);
    this.subscription = timer.subscribe( () => {
      this.test = false;
      this.loadImageList();
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadImageList() {
    this.listImage = [];
    this.apiService.getImages('gallery1').subscribe( (list) => {
      this.images = list;
      this.images.map( i => this.listImage.push(APP_SETTINGS.imageUrl + i.name));
      this.test = true;
    });
  }

  eventClick(e) {
    const total = this.images.length - 1;
    this.counter = e.layerX < 150 ? this.click_prev(total) : this.click_next(total);
  }

  click_next(total) {
    return this.counter < total ? this.counter = this.counter + 1 : 0;
  }

  click_prev(total) {
    return this.counter = 0 ? this.counter = this.counter - 1 : total;
  }

}

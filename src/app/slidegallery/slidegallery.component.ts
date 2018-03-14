import { map } from 'rxjs/operators';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';
import { Slidegallery } from '../slidegallery/slidegallery.model';
import { Subscription } from 'rxjs/Subscription';
import { TimerObservable } from "rxjs/observable/TimerObservable";

@Component({
  selector: 'app-slidegallery',
  templateUrl: './slidegallery.component.html',
  styleUrls: ['./slidegallery.component.css']
})

export class SlidegalleryComponent implements OnInit, OnDestroy {

  images: Slidegallery[];
  public listImage = [];
  public test: boolean = false;
  public subscription: Subscription;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadImageList();
    let timer = TimerObservable.create(10000, 30000);
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
      this.images.map( i => this.listImage.push("http://10.121.1.27/gallery1/" + i.name));
      this.test = true;
    });
  }

}

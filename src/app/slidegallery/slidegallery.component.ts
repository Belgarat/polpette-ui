import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Settings, Image } from 'ng2-slideshow';

@Component({
  selector: 'app-slidegallery',
  templateUrl: './slidegallery.component.html',
  styleUrls: ['./slidegallery.component.css']
})

export class SlidegalleryComponent implements OnInit {
  settings: Settings;
  images: Image[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getImages('gallery1').subscribe(list => console.log(list));
  }

}
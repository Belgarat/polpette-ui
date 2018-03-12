import { map } from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Slidegallery } from '../slidegallery/slidegallery.model';

@Component({
  selector: 'app-slidegallery',
  templateUrl: './slidegallery.component.html',
  styleUrls: ['./slidegallery.component.css']
})

export class SlidegalleryComponent implements OnInit {

  images: Slidegallery[];
  public listImage = [];
  @Input() test: number;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadImageList();
    this.test = 2;
  }

  loadImageList() {
    this.apiService.getImages('gallery1').subscribe( (list) => {
      this.images = list;
      this.images.map( i => this.listImage.push("http://localhost/gallery1/" + i.name));
      console.log(this.listImage);
    });
  }

}

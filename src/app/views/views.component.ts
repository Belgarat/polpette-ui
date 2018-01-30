import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.css']
})
export class ViewsComponent implements OnInit {
  public obj: String = "First value";
  
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    if(this.route.snapshot.params["obj"]){
      this.obj = this.route.snapshot.params["obj"];
    }
  }

  onClick(){
    (this.obj == "Change") ? this.obj="test":this.obj="Change";
  }

}

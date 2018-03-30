import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger, state } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';
import { TimerObservable } from 'rxjs/observable/TimerObservable';

@Component({
  selector: 'app-rss-feed',
  templateUrl: './rss-feed.component.html',
  styleUrls: ['./rss-feed.component.css'],
  animations: [
    trigger('load',
    [
      transition('* => *', [style({ opacity: 0.8, transform: 'translateX(50%)' }), animate('1000ms ease-out')]),
    ])
  ]
})
export class RssFeedComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  footerState = 'inactive';
  message: string;

  constructor() { }

  ngOnInit() {
    this.message = 'Prima news';
    const timer = TimerObservable.create(500, 7000);
    this.subscription = timer.subscribe( () => {
      this.changeState();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  changeState() {
    this.footerState === 'inactive' ? this.footerState = 'slide' : this.footerState = 'inactive';
    this.footerState === 'inactive' ? this.message = 'Seconda news' : this.message = 'Prima news';
  }

}

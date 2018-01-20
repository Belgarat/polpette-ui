import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PunteggioComponent } from './punteggio.component';

describe('PunteggioComponent', () => {
  let component: PunteggioComponent;
  let fixture: ComponentFixture<PunteggioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PunteggioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PunteggioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

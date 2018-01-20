import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadraComponent } from './squadra.component';

describe('SquadraComponent', () => {
  let component: SquadraComponent;
  let fixture: ComponentFixture<SquadraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SquadraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquadraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

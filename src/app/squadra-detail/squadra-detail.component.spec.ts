import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadraDetailComponent } from './squadra-detail.component';

describe('SquadraDetailComponent', () => {
  let component: SquadraDetailComponent;
  let fixture: ComponentFixture<SquadraDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SquadraDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquadraDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

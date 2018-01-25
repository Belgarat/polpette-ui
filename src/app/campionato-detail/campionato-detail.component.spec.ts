import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampionatoDetailComponent } from './campionato-detail.component';

describe('CampionatoDetailComponent', () => {
  let component: CampionatoDetailComponent;
  let fixture: ComponentFixture<CampionatoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampionatoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampionatoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

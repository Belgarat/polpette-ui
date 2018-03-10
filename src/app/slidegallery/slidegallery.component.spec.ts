import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidegalleryComponent } from './slidegallery.component';

describe('SlidegalleryComponent', () => {
  let component: SlidegalleryComponent;
  let fixture: ComponentFixture<SlidegalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidegalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidegalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

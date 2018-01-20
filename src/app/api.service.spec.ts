import { TestBed, inject } from '@angular/core/testing';

import { CampionatoService } from './campionato.service';

describe('CampionatoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CampionatoService]
    });
  });

  it('should be created', inject([CampionatoService], (service: CampionatoService) => {
    expect(service).toBeTruthy();
  }));
});

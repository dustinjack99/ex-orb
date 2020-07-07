import { TestBed } from '@angular/core/testing';

import { PlanetSearchService } from './planet-search.service';

describe('PlanetSearchService', () => {
  let service: PlanetSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanetSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

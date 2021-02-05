import { TestBed } from '@angular/core/testing';

import { HeatMarkerService } from './heat-marker.service';

describe('HeatMarkerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeatMarkerService = TestBed.get(HeatMarkerService);
    expect(service).toBeTruthy();
  });
});

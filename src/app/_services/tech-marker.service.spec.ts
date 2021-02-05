import { TestBed } from '@angular/core/testing';

import { TechMarkerService } from './tech-marker.service';

describe('TechMarkerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TechMarkerService = TestBed.get(TechMarkerService);
    expect(service).toBeTruthy();
  });
});

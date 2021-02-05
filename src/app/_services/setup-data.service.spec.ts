import { TestBed } from '@angular/core/testing';

import { SetupDataService } from './setup-data.service';

describe('SetupDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SetupDataService = TestBed.get(SetupDataService);
    expect(service).toBeTruthy();
  });
});

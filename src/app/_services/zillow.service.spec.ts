import { TestBed, inject } from '@angular/core/testing';

import { ZillowService } from './zillow.service';

describe('ZillowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZillowService]
    });
  });

  it('should be created', inject([ZillowService], (service: ZillowService) => {
    expect(service).toBeTruthy();
  }));
});

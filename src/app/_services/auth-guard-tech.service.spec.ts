import { TestBed } from '@angular/core/testing';

import { AuthGuardTechService } from './auth-guard-tech.service';

describe('AuthGuardTechService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGuardTechService = TestBed.get(AuthGuardTechService);
    expect(service).toBeTruthy();
  });
});

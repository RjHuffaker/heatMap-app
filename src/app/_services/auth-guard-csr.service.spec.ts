import { TestBed } from '@angular/core/testing';

import { AuthGuardCsrService } from './auth-guard-csr.service';

describe('AuthGuardCsrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGuardCsrService = TestBed.get(AuthGuardCsrService);
    expect(service).toBeTruthy();
  });
});

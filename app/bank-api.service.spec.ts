import { TestBed } from '@angular/core/testing';

import { BankApiService } from './bank-api.service';

describe('BankApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BankApiService = TestBed.get(BankApiService);
    expect(service).toBeTruthy();
  });
});

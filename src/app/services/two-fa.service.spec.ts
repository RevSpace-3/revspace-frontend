import { TestBed } from '@angular/core/testing';

import { TwoFAService } from './two-fa.service';

describe('TwoFAServiceService', () => {
  let service: TwoFAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwoFAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

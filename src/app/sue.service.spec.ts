import { TestBed } from '@angular/core/testing';

import { SueService } from './sue.service';

describe('SueService', () => {
  let service: SueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

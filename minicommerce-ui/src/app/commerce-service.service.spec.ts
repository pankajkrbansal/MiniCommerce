import { TestBed } from '@angular/core/testing';

import { CommerceServiceService } from './commerce-service.service';

describe('CommerceServiceService', () => {
  let service: CommerceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommerceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ECommerceService } from './ecommerce.service';

describe('ECommerceService', () => {
  let service: ECommerceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ECommerceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

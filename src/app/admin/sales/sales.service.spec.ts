import { TestBed, inject } from '@angular/core/testing';

import { SalesService } from './sales.service';

describe('SalesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalesService]
    });
  });

  it('should be created', inject([SalesService], (sales: SalesService) => {
    expect(sales).toBeTruthy();
  }));
});
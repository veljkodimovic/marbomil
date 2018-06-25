import { TestBed, inject } from '@angular/core/testing';

import { WarrantyService } from './warranty.service';

describe('ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WarrantyService]
    });
  });

  it('should be created', inject([WarrantyService], (service: WarrantyService) => {
    expect(service).toBeTruthy();
  }));
});

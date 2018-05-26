import { TestBed, inject } from '@angular/core/testing';

import { AtestService } from './atest.service';

describe('AtestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AtestService]
    });
  });

  it('should be created', inject([AtestService], (service: AtestService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DressService } from './dress.service';

describe('Service: Dress', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DressService]
    });
  });

  it('should ...', inject([DressService], (service: DressService) => {
    expect(service).toBeTruthy();
  }));
});

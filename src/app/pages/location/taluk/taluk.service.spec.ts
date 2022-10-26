/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TalukService } from './taluk.service';

describe('Service: Taluk', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TalukService]
    });
  });

  it('should ...', inject([TalukService], (service: TalukService) => {
    expect(service).toBeTruthy();
  }));
});

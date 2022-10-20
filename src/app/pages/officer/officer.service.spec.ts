/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OfficerService } from './officer.service';

describe('Service: Officer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OfficerService]
    });
  });

  it('should ...', inject([OfficerService], (service: OfficerService) => {
    expect(service).toBeTruthy();
  }));
});

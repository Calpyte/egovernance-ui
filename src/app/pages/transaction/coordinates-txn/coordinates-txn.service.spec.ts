/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CoordinatesTxnService } from './coordinates-txn.service';

describe('Service: CoordinatesTxn', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoordinatesTxnService]
    });
  });

  it('should ...', inject([CoordinatesTxnService], (service: CoordinatesTxnService) => {
    expect(service).toBeTruthy();
  }));
});

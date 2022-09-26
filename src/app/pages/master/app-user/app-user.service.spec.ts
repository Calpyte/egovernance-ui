/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppUserService } from './app-user.service';

describe('Service: AppUser', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppUserService]
    });
  });

  it('should ...', inject([AppUserService], (service: AppUserService) => {
    expect(service).toBeTruthy();
  }));
});

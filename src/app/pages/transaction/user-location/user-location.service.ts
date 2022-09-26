import { Injectable } from '@angular/core';
import { AppConfiguration } from '../../../common-shared/AppConfiguration';
import { CommonHttpClientService } from '../../../common-shared/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class UserLocationService {

  constructor(
    private commonHttpClientService: CommonHttpClientService,
    private appConfiguration: AppConfiguration
  ) {}

  getTransactionCoordinates = (data:Object) => {
    return this.commonHttpClientService.httpPost(
      this.appConfiguration.getTransactionByUserAndDate,
      data
    );
  };

}

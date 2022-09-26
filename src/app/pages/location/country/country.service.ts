import { Injectable } from '@angular/core';
import { AppConfiguration } from '../../../common-shared/AppConfiguration';
import { CommonHttpClientService } from '../../../common-shared/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

constructor(
  private commonHttpClientService: CommonHttpClientService,
  private appConfiguration: AppConfiguration,
) {}

getCountries = (postPerPage: any, pageNumber: number, filter: any[]) => {
  let data = {
    draw: this.randomNumber(),
    filter: filter,
    pageNo: pageNumber,
    pageSize: postPerPage,
  };
  return this.commonHttpClientService.httpPost(
    this.appConfiguration.getCountries,
    data
  );
};
addCountry = (data) => {
  return this.commonHttpClientService.httpPost(
    this.appConfiguration.addCountry,
    data
  );
};

deleteCountry = (id) => {
  return this.commonHttpClientService.httpGet(
    this.appConfiguration.deleteCountry + id
  );
};

getCountryById = (id) => {
  return this.commonHttpClientService.httpGet(
    this.appConfiguration.getCountryById + id
  );
};

getAllCountries=()=>{
  return this.commonHttpClientService.httpGet(
      this.appConfiguration.getAllCountries
  );
}


randomNumber = () => {
  return Math.floor(Math.random() * 100 + 1);
};

}

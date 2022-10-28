import { NullTemplateVisitor } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AppConfiguration } from '../../common-shared/AppConfiguration';
import { CommonHttpClientService } from '../../common-shared/commonHttpService';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

  getAllCountries = () => {
    // return this.commonHttpClientService.httpGet(this.appConfiguration.getAllCountry);
    return null;
  }
  getAllStateByCountry = (id) => {
    // return this.commonHttpClientService.httpGet(this.appConfiguration.getStatesByCountry + id);
    return null;

  }

  getAllDistrictByState = (id) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.district.getAllDistrictByState + id);
  }

  getAllTalukByDistrict = (id) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.taluk.getAllTalukByDistrict + id);
  }

  getVillageByTaluk = (id: string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.village.getVillageByTaluk + id);
  }

  getLocationCount = () => {
    return null;;
    // return this.commonHttpClientService.httpGet(this.appConfiguration.getLocationCount);
  }

  getAllVillages() {
     return this.commonHttpClientService.httpGet(this.appConfiguration.village.getAll);
  }

  getAllStates=()=>{
    return this.commonHttpClientService.httpGet(this.appConfiguration.state.getStates);
  }


}

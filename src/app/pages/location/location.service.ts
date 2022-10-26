import { Injectable } from '@angular/core';
import { AppConfiguration } from '../../common-shared/AppConfiguration';
import { CommonHttpClientService } from '../../common-shared/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

constructor(
  private commonHttpClientService: CommonHttpClientService,
  private appConfiguration: AppConfiguration
) { }


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
  return this.commonHttpClientService.httpGet(this.appConfiguration.location.locationCount);
}

getAllVillages() {
  return this.commonHttpClientService.httpGet(this.appConfiguration.village.getAll);
}


}

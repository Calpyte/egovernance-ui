import { Injectable } from '@angular/core';
import { AppConfiguration } from '../../../common-shared/AppConfiguration';
import { CommonHttpClientService } from '../../../common-shared/commonHttpService';


@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

  getDistrict = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.district.getAll, data);
  }

  addDistrict = (data: any) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.district.save, data);
  }

  getDistrictById = (id: string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.district.gettById+id);
  }

  deleteDistrict = (id: string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.district.delete+id);
  }

  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }
}

import { Injectable } from '@angular/core';
import { AppConfiguration } from '../../common-shared/AppConfiguration';
import { CommonHttpClientService } from '../../common-shared/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class OfficerService {

  constructor(
    private commonHttpClientService: CommonHttpClientService,
    private appConfiguration: AppConfiguration
  ) {}

  addOfficer = (data) => {
    return this.commonHttpClientService.httpPost(
      this.appConfiguration.officer.save,
      data
    );
  };

  getAllOfficers = () => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.officer.getAllOfficers
    );
  };

  getOfficerById = (id) => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.officer.findById + id
    );
  };

  deleteOfficer = (id) => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.officer.deleteOfficer + id
    );
  };

  getOfficers = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      draw: this.randomNumber(),
      filter: filter,
      pageNo: pageNumber,
      pageSize: postPerPage,
    };
    return this.commonHttpClientService.httpPost(
      this.appConfiguration.officer.getOfficers,
      data
    );
  };

  randomNumber = () => {
    return Math.floor(Math.random() * 100 + 1);
  };

}

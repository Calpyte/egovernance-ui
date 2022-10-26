import { Injectable } from '@angular/core';
import { AppConfiguration } from '../../common-shared/AppConfiguration';
import { CommonHttpClientService } from '../../common-shared/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  constructor(
    private commonHttpClientService: CommonHttpClientService,
    private appConfiguration: AppConfiguration
  ) {}

  addDesignation = (data) => {
    return this.commonHttpClientService.httpPost(
      this.appConfiguration.designation.addDesignation,
      data
    );
  };

  getAllDesignations = () => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.designation.getAllDesignations
    );
  };


  getDesignationById = (id) => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.designation.getDesignationById + id
    );
  };

  deleteDesignation = (id) => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.designation.deleteDesignation + id
    );
  };

  getDesignations = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      draw: this.randomNumber(),
      filter: filter,
      pageNo: pageNumber,
      pageSize: postPerPage,
    };
    return this.commonHttpClientService.httpPost(
      this.appConfiguration.designation.getDesignations,
      data
    );
  };



  randomNumber = () => {
    return Math.floor(Math.random() * 100 + 1);
  };

}

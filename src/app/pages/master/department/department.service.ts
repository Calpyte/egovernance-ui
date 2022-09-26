import { Injectable } from '@angular/core';
import { AppConfiguration } from '../../../common-shared/AppConfiguration';
import { CommonHttpClientService } from '../../../common-shared/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(
    private commonHttpClientService: CommonHttpClientService,
    private appConfiguration: AppConfiguration
  ) {}

  getDepartments = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      draw: this.randomNumber(),
      filter: filter,
      pageNo: pageNumber,
      pageSize: postPerPage,
    };
    return this.commonHttpClientService.httpPost(
      this.appConfiguration.getDepartments,
      data
    );
  };
  deleteDepartment = (id) => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.deleteDepartment + id
    );
  };

  addDepartment = (data) => {
    return this.commonHttpClientService.httpPost(
      this.appConfiguration.addDepartment,
      data
    );
  };
  getDepartmentById = (id) => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.getDepartmentById + id
    );
  };

  randomNumber = () => {
    return Math.floor(Math.random() * 100 + 1);
  };



}

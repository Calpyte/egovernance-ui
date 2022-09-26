import { Injectable } from '@angular/core';
import { AppConfiguration } from '../../common-shared/AppConfiguration';
import { CommonHttpClientService } from '../../common-shared/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  constructor(
    private commonHttpClientService: CommonHttpClientService,
    private appConfiguration: AppConfiguration
  ) {}

  addDepartment = (data) => {
    return this.commonHttpClientService.httpPost(
      this.appConfiguration.department.save,
      data
    );
  };

  getAllDepartments = () => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.department.getAll
    );
  };

  getDepartmentById = (id) => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.department.getById + id
    );
  };

  deleteDepartment = (id) => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.department.delete + id
    );
  };

  getDepartment = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      draw: this.randomNumber(),
      filter: filter,
      pageNo: pageNumber,
      pageSize: postPerPage,
    };
    return this.commonHttpClientService.httpPost(
      this.appConfiguration.department.get,
      data
    );
  };

  randomNumber = () => {
    return Math.floor(Math.random() * 100 + 1);
  };
}

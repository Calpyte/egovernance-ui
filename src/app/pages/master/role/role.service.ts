import { Injectable } from '@angular/core';
import { AppConfiguration } from '../../../common-shared/AppConfiguration';
import { CommonHttpClientService } from '../../../common-shared/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(
    private commonHttpClientService: CommonHttpClientService,
    private appConfiguration: AppConfiguration
  ) {}

  getRoles = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      draw: this.randomNumber(),
      filter: filter,
      pageNo: pageNumber,
      pageSize: postPerPage,
    };
    return this.commonHttpClientService.httpPost(
      this.appConfiguration.getRoles,
      data
    );
  };
  deleteRole = (id) => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.deleteRole + id
    );
  };

  addRole = (data) => {
    return this.commonHttpClientService.httpPost(
      this.appConfiguration.addRole,
      data
    );
  };
  getRoleById = (id) => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.getRoleById + id
    );
  };

  randomNumber = () => {
    return Math.floor(Math.random() * 100 + 1);
  };



}

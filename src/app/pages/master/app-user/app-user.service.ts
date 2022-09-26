import { Injectable } from '@angular/core';
import { AppConfiguration } from '../../../common-shared/AppConfiguration';
import { CommonHttpClientService } from '../../../common-shared/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {
  constructor(
    private commonHttpClientService: CommonHttpClientService,
    private appConfiguration: AppConfiguration
  ) {}

  getUsers = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      draw: this.randomNumber(),
      filter: filter,
      pageNo: pageNumber,
      pageSize: postPerPage,
    };
    return this.commonHttpClientService.httpPost(
      this.appConfiguration.getUsers,
      data
    );
  };
  deleteUser = (id) => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.deleteUser + id
    );
  };

  addUser = (data) => {
    return this.commonHttpClientService.httpPost(
      this.appConfiguration.addUser,
      data
    );
  };
  getUserById = (id) => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.getUserById + id
    );
  };

  randomNumber = () => {
    return Math.floor(Math.random() * 100 + 1);
  };

  getAllDepartments = () => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.getAllDepartments
    );
  };
  getAllRoles = () => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.getAllRoles
    );
  };

  getAllUsers=()=>{
    return this.commonHttpClientService.httpGet(
        this.appConfiguration.getAllUsers
    );
  }



}

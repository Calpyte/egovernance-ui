import { Injectable } from '@angular/core';
import { AppConfiguration } from '../../common-shared/AppConfiguration';
import { CommonHttpClientService } from '../../common-shared/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(
  private commonHttpClientService: CommonHttpClientService,
  private appConfiguration: AppConfiguration
) { }

addUser = (data) => {
  return this.commonHttpClientService.httpPost(
    this.appConfiguration.user.save,
    data
  );
};

getAllUsers = () => {
return this.commonHttpClientService.httpGet(
  this.appConfiguration.user.getAll,
 );
};

getUserById = (id) => {
  return this.commonHttpClientService.httpGet(
    this.appConfiguration.user.getById + id
  );
};

getUser = (postPerPage: any, pageNumber: number, filter: any[]) => {
  let data = {
    draw: this.randomNumber(),
    filter: filter,
    pageNo: pageNumber,
    pageSize: postPerPage,
  };
  return this.commonHttpClientService.httpPost(
    this.appConfiguration.user.get,
    data
  );
};
randomNumber = () => {
  return Math.floor(Math.random() * 100 + 1);
};

getAllDepartments = () => {
  return this.commonHttpClientService.httpGet(
    this.appConfiguration.department.getAll
  );
};
getAllRoles = () => {
  return this.commonHttpClientService.httpGet(
    this.appConfiguration.role.getAll,
  );
};
getAllOffice = () => {
  return this.commonHttpClientService.httpGet(
    this.appConfiguration.office.getAll,
  );
};


}

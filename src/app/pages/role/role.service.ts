import { Injectable } from '@angular/core';
import { AppConfiguration } from '../../common-shared/AppConfiguration';
import { CommonHttpClientService } from '../../common-shared/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

constructor(
  private commonHttpClientService: CommonHttpClientService,
  private appConfiguration: AppConfiguration
) { }

addRole = (data) => {
  return this.commonHttpClientService.httpPost(
    this.appConfiguration.role.save,
    data
  );
};
getAllRoles = () => {
  return this.commonHttpClientService.httpGet(
    this.appConfiguration.role.getAll,
  );
};

getRoleById = (id) => {
  return this.commonHttpClientService.httpGet(
    this.appConfiguration.role.getById + id
  );
};

deleteRole = (id) => {
  return this.commonHttpClientService.httpGet(
    this.appConfiguration.role.delete + id
  );
};

getRole = (postPerPage: any, pageNumber: number, filter: any[]) => {
  let data = {
    draw: this.randomNumber(),
    filter: filter,
    pageNo: pageNumber,
    pageSize: postPerPage,
  };
  return this.commonHttpClientService.httpPost(
    this.appConfiguration.role.get,
    data
  );
};

  randomNumber = () => {
    return Math.floor(Math.random() * 100 + 1);
  };

}

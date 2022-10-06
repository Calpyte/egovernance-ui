import { Injectable } from '@angular/core';
import { AppConfiguration } from '../../common-shared/AppConfiguration';
import { CommonHttpClientService } from '../../common-shared/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {

constructor(
  private commonHttpClientService: CommonHttpClientService,
  private appConfiguration: AppConfiguration
) { }

addOffice = (data) => {
return this.commonHttpClientService.httpPost(
  this.appConfiguration.office.save,
  data
 );
}; 
getAllOffice = () => {
  return this.commonHttpClientService.httpGet(
    this.appConfiguration.office.getAll
  );
};
getOfficeById = (id) => {
  return this.commonHttpClientService.httpGet(
    this.appConfiguration.office.getById + id
  );
};
getOffice = (postPerPage: any, pageNumber: number, filter: any[]) => {
  let data = {
    draw: this.randomNumber(),
    filter: filter,
    pageNo: pageNumber,
    pageSize: postPerPage,
  };
  return this.commonHttpClientService.httpPost(
    this.appConfiguration.office.get,
    data
  );
};
getAllDepartments = () => {
  return this.commonHttpClientService.httpGet(
    this.appConfiguration.department.getAll
  );
};

randomNumber = () => {
  return Math.floor(Math.random() * 100 + 1);
};
}

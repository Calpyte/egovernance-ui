import { Injectable } from '@angular/core';
import { AppConfiguration } from '../../../common-shared/AppConfiguration';
import { CommonHttpClientService } from '../../../common-shared/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {

constructor(
  private commonHttpClientService: CommonHttpClientService,
  private appConfiguration: AppConfiguration

  ) { }

  getOffice = (postPerPage: any, pageNumber: number, filter: any[]) => {
  let data = {
    draw: this.randomNumber(),
    filter: filter,
    pageNo: pageNumber,
    pageSize: postPerPage,
  };
  return this.commonHttpClientService.httpPost(
    this.appConfiguration.getOffice,
    data
  );
};

addOffice = (data) => {
  return this.commonHttpClientService.httpPost(
    this.appConfiguration.addOffice,
    data
  );
};
getAllDepartments = () => {
  return this.commonHttpClientService.httpGet(
    this.appConfiguration.getAllDepartments
  );
};

// getAllOffices = () => {
//   return this.commonHttpClientService.httpGet(
//     this.appConfiguration.getAllOffices
//   );
// };

getDepartmentById = (id) => {
  return this.commonHttpClientService.httpGet(
    this.appConfiguration.getDepartmentById + id
  );
};

// getOfficeById = (id) => {
//   return this.commonHttpClientService.httpGet(
//     this.appConfiguration.getOfficeById + id
//   );
// };

// deleteDepartment = (id) => {
//   return this.commonHttpClientService.httpGet(
//     this.appConfiguration.deleteDepartment + id
//   );
// };

// deleteOffice = (id) => {
//   return this.commonHttpClientService.httpGet(
//     this.appConfiguration.deleteOffice + id
//   );
// };

randomNumber = () => {
  return Math.floor(Math.random() * 100 + 1);
};


}

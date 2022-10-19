import { Injectable } from '@angular/core';
import { AppConfiguration } from '../../common-shared/AppConfiguration';
import { CommonHttpClientService } from '../../common-shared/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

constructor(private commonHttpClientService: CommonHttpClientService,
  private appConfiguration: AppConfiguration) { }

getActivities = (postPerPage: any, pageNumber: number, filter: any[]) => {
  let data = {
    draw: this.randomNumber(),
    filter: filter,
    pageNo: pageNumber,
    pageSize: postPerPage,
  };
  return this.commonHttpClientService.httpPost(
    this.appConfiguration.activity.getActivities,
    data
  );
};

randomNumber = () => {
  return Math.floor(Math.random() * 100 + 1);
};

getActivityById = (id) => {
  return this.commonHttpClientService.httpGet(
    this.appConfiguration.activity.getActivityById + id
  );
};

getImgById = (id) => {
  return this.commonHttpClientService.httpGet(
    this.appConfiguration.file.getImgById + id
  );
};



}

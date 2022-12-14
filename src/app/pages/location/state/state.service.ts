import { Injectable } from '@angular/core';
import { AppConfiguration } from '../../../common-shared/AppConfiguration';
import { CommonHttpClientService } from '../../../common-shared/commonHttpService';


@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private commonHttpClientService: CommonHttpClientService,
    private appConfiguration: AppConfiguration) { }

  getState =(postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.state.get, data);
  }

  getAllStates = () => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.state.get
    )
  }

  getStates = () => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.state.getStates
    );
  }

  addState = (data: any) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.state.save, data);
  }

  getStateById = (id: string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.state.getById+ id);
  }

  deleteState = (id: string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.state.delete+id);
  }

  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }
}

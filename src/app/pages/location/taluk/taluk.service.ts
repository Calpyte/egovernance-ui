import { Injectable } from '@angular/core';
import { AppConfiguration } from '../../../common-shared/AppConfiguration';
import { CommonHttpClientService } from '../../../common-shared/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class TalukService {
  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

  getTaluk = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.taluk.get, data);
  }

  addTaluk = (data: any) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.taluk.save, data);
  }

  getTalukById = (id: string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.taluk.getById+id);
  }

  deleteTaluk = (id: string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.taluk.delete+id);
  }
  getAllTaluk = () => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.taluk.getAll);
  }
  getAllTaluks = () => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.taluk.getTaluks
    );
  }
  getAllDistricts = () => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.district.getDistricts
    );
  }
  getAllStates = () => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.state.getStates
    );
  }
  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }

}

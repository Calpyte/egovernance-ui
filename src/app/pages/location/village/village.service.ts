import { Injectable } from '@angular/core';
import { AppConfiguration } from '../../../common-shared/AppConfiguration';
import { CommonHttpClientService } from '../../../common-shared/commonHttpService';


@Injectable({
  providedIn: 'root'
})
export class VillageService {

  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

  getVillage = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.village.getAll, data);
  }

  addVillage = (data: any) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.village.save, data);
  }

  getAllVillages = () =>{
    return this.commonHttpClientService.httpGet(this.appConfiguration.village.get);
  }

  getVillageById = (id: string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.village.getById + id);
  }

  deleteVillage = (id: string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.village.delete + id);
  }
  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }

}

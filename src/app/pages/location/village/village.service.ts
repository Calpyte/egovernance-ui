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
    return this.commonHttpClientService.httpPost(this.appConfiguration.village.get, data);
  }

  addVillage = (data: any) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.village.save, data);
  }

  getAllVillages = () =>{
    return this.commonHttpClientService.httpGet(this.appConfiguration.village.getAll);
  }

  getVillageById = (id: string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.village.getById + id);
  }

  deleteVillage = (id: string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.village.delete + id);
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
  getAllVillage = () => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.village.getAllVillages
    );
  }
  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }

}

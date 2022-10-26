import { Injectable } from '@angular/core';
import { AppConfiguration } from '../../../common-shared/AppConfiguration';
import { CommonHttpClientService } from '../../../common-shared/commonHttpService';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private commonHttpClientService: CommonHttpClientService,
    private appConfiguration: AppConfiguration) {

  }
  getCountry=(postPerPage: any, pageNumber: number, filter: any[])=> {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage
    }
    return null;
  }

  addCountry = (data: any) => {
    return null;
  }

  getCountryById = (id: string) => {
    return null;
  }
  deleteCountry = (id) => {
    return null;
  }
  randomNumber=()=> {
    return Math.floor((Math.random() * 100) + 1);
  }

}

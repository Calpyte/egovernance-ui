import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AppConfiguration {

  baseUrl = environment.baseUrl;

  role={
    save:"",
  }
  department={
    save:"governance/department/save",
    get:"governance/department",
    getById:"governance/department/by-id?id=",
    delete:"",
    getAll:"",
  }
  getCharts="";

  uploadFile="";

}

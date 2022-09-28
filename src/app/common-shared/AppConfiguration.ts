import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AppConfiguration {

  baseUrl = environment.baseUrl;

  role={
    save:"governance/role/save",
    get:"governance/role",
    getById:"governance/role/by-id?id=",
    delete:"governance/role/delete?id=",
    getAll: "",
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

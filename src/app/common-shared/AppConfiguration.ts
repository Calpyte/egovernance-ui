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
    getAll: "governance/role/",
  }
  department={
    save:"governance/department/save",
    get:"governance/department",
    getById:"governance/department/by-id?id=",
    delete:"",
    getAll:"governance/department/"
  }
  user={
    save:"governance/user/save",
    get:"governance/user",
    getById:"governance/user/by-id?id=",
    delete:"",
    getAll:"governance/user/",
  }

  office={
    save: "governance/office/save",
    get: "governance/office",
    getById: "governance/office/by-id?id=",
    delete: "governance/office/delete?id=",
    getAll:"governance/office/",
    getOfficesByDepartment:"governance/office/by-department?id="
  }
  getCharts="";

  dashboard={
    getCount : "governance/dashboard/count"
  }

  uploadFile={

  };

  file ={
    getImgById:"governance/file/get/by-id?id="
  }

  activity={
    getActivities:"governance/activity",
    getActivityById:"governance/activity/by-id?id=",
    getAllActivities:"governance/activity/",
  }

  officer={
    getOfficers:"governance/officer/get-pagination",
    getAllOfficers:"governance/officer/get-all",
    deleteOfficer:"governance/officer/delete?id=",
    findById:"governance/officer/by-id?id=",
    save:"governance/officer/save"
  }

}

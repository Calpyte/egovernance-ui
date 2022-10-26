import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AppConfiguration {

  successIconUrl = "assets/images/icons/modal-success-ico.png"
  failureIconUrl = "assets/images/icons/modal-failure-ico.png"

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
    getAll:"governance/department/",
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
    delete: "",
    getAll:"governance/office/",
  }
  getCharts="";

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
  
  //location

  state = {
    save : "governance/state/save",
    getAll : "governance/state/",
    getById : "governance/state/by-id?id=",
    get : "governance/state/state",
    delete : "governance/state/delete?id="
  }

   district = {
    save : "governance/district/save",
    get : "governance/district",
    getAll : "governance/district/districts",
    delete : "governance/district/delete?id=",
    gettById : "governance/district/by-id?id=",
    getAllDistrictByState : "governance/district/by-state?state="
   }
    
  taluk = {
    save : "governance/taluk/save",
    get : "governance/taluk/",
    getAll : "governance/taluk/taluks",
    delete : "governance/taluk/delete?id=",
    getById : "governance/taluk/by-id?id==",
    getAllTalukByDistrict : "governance/taluk/by-district?district=",
  }
   
  village = {
    save : "governance/village/save",
    get : "governance/village/",
    getAll : "governance/village/Villages",
    delete : "governance/village/delete?id=",
    getById : "governance/village/by-id?id=",
    getVillageByTaluk : "governance/village/by-taluk?taluk="
  }

  location = {
    locationCount : "governance/location"
  }
    
  
    
  
   


}

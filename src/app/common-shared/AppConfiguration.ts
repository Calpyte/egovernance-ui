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
    getCount : "governance/dashboard/count",
    getChart:"governance/dashboard/top-activities",
    getPastChart:"governance/dashboard/past-top-activities?type="
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

  //location

  state = {
    save : "governance/state/save",
    getAll : "governance/state/state",
    getById : "governance/state/by-id?id=",
    get : "governance/state/",
    delete : "governance/state/delete?id=",
    getStates: "governance/state/state"
  }

   district = {
    save : "governance/district/save",
    get : "governance/district",
    getAll : "governance/district/districts",
    delete : "governance/district/delete?id=",
    getById : "governance/district/by-id?id=",
    getAllDistrictByState : "governance/district/by-state?state=",
    getDistricts: "governance/district/districts"
   }

  taluk = {
    save : "governance/taluk/save",
    get : "governance/taluk/",
    getAll : "governance/taluk/taluks",
    delete : "governance/taluk/delete?id=",
    getById : "governance/taluk/by-id?id==",
    getAllTalukByDistrict : "governance/taluk/by-district?district=",
    getTaluks: "governance/taluk/taluks"
  }

  village = {
    save : "governance/village/save",
    get : "governance/village/",
    getAll : "governance/village/Villages",
    delete : "governance/village/delete?id=",
    getById : "governance/village/by-id?id=",
    getVillageByTaluk : "governance/village/by-taluk?taluk=",
    getAllVillages: "governance/village/Villages"
  }

  location = {
    locationCount : "governance/location"
  }







  officer={
    getOfficers:"governance/officer/get-pagination",
    getAllOfficers:"governance/officer/get-all",
    deleteOfficer:"governance/officer/delete?id=",
    findById:"governance/officer/by-id?id=",
    save:"governance/officer/save"
  }

  designation={
    getAllDesignations:"governance/designation/get-all",
    getDesignations:"governance/designation/get-pagination",
    getDesignationById:"governance/designation/by-id?id=",
    deleteDesignation:"governance/designation/delete?id=",
    addDesignation:"governance/designation/save"
  }

}

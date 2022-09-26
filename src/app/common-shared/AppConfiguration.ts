import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AppConfiguration {

  successIconUrl = "assets/images/icons/modal-success-ico.png";
  failureIconUrl = "assets/images/icons/modal-failure-ico.png";

  baseUrl = environment.baseUrl;

  //Login
  login = "user/user/login";

  //UploadFile
  uploadFile = "master/file/save";
  getImage = "master/file/get/by-id?id=";

  //Department
  getDepartments="department/";
  deleteDepartment="department/delete?id=";
  getDepartmentById="department/by-id?id=";
  addDepartment="department/save";
  getAllDepartments="department/departments";
  // getDepartments="governance/department/";
  // deleteDepartment="governance/department/by-id?id=";
  // getDepartmentById="governance/department/by-id?id=";
  // addDepartment="governance/department/save";
  // getAllDepartments="governance/departments";

  //Office
  getOffice="governance/office/";
  addOffice="governance/office/save/";
  // getOfficeById="governance/office/by-id?id=";
  // deleteOffice="governance/office/by-id?id=";
  // getAllOffices="governance/office/";
  
  //Role
  getRoles="role/";
  deleteRole="role/delete?id=";
  getRoleById="role/by-id?id=";
  addRole="role/save";
  getAllRoles="role/roles";

  //Users
  getUsers="user/";
  deleteUser="user/delete?id=";
  getUserById="user/by-id?id=";
  addUser="user/save";
  getAllUsers="user/users";

  //Transactions
  getTransactionByUserAndDate="transaction/transactions-by-user-and-date";

  //Country
  getCountries="country/";
  addCountry="country/save";
  getCountryById="country/by-id?id=";
  deleteCountry="country/delete?id=";
  getAllCountries="country/countries";


  getCharts = "";


}

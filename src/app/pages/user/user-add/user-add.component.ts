import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonToastrService } from '../../../common-shared/common-toastr/common-toastr.service';
import { MultiSelectComponent } from '../../../common-shared/multi-select/multi-select.component';
import { trimValidator } from '../../../common-shared/trim.validator';
import { UserService } from '../user.service';

@Component({
  selector: 'ngx-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  @ViewChild("departmentMultiSelect", { static: false }) departmentMultiSelectComponent: MultiSelectComponent;
  @ViewChild("rolesMultiSelect", { static: false }) rolesMultiSelectComponent: MultiSelectComponent;
  @ViewChild("officesMultiSelect", {static: false}) officesMultiSelectComponent: MultiSelectComponent;
  @Output() saveEvent = new EventEmitter();
  userForm: FormGroup;
  title: string;
  id: string;
  isSubmit: boolean;
  roles: any = [];
  departments: any = [];
  offices: any = [];
  selectedRoles: any = [];
  selectedDepartments: any = [];
  selectedOffices: any = [];
  firstName: String;
  lastName: String;
  mobileNo: number;
  email: String;
  userName: String;
  password: String;


  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commonToastrService: CommonToastrService,
    private userService: UserService,
    public formBuilder: FormBuilder
  ) { }

   ngOnInit() {
     this.getDepartments();
     this.getRoles();
     this.getOffices();
    this.title = this.data?.title;
    this.userForm = this.formBuilder.group({
      firstName: ["", [Validators.required, trimValidator]],
      lastName: ["", [Validators.required, trimValidator]],
      mobileNo: ["", [Validators.required, trimValidator]],
      email: ["", [Validators.required, Validators.email]],
      userName: ["", [Validators.required, trimValidator]],
      password: ["", [Validators.required, trimValidator]],
      department:[""],
      role:[""],
      office:[""],
    });
    if (this.data.id) {
      this.userService
        .getUserById(this.data?.id)
        .toPromise()
        .then((data: any) => {
          this.selectedDepartments=data.department;
          this.selectedRoles=data.role;
          this.selectedOffices=data.office;
          this.id = data?.id;
          this.userForm = this.formBuilder.group({
            firstName: data?.firstName,
            lastName: data?.lastName,
            mobileNo: data?.mobileNo,
            email: data?.email,
            userName: data?.userName,
            password: data?.password,
            department:this.selectedDepartments,
            role: this.selectedRoles,
            office: this.selectedOffices
          });
        });
    }
    this.isSubmit = false;
  }

  submitForm = () => {
    this.isSubmit = true;
    this.departmentMultiSelectComponent.formInvalid();
    this.rolesMultiSelectComponent.formInvalid();
    this.officesMultiSelectComponent.formInvalid();
    this.saveEvent.emit(true);
    this.userForm.patchValue({
      department: this.selectedDepartments,
      role: this.selectedRoles,
      office: this.selectedOffices
    })
    let data = this.userForm?.value;
    if (this.id) {
      data.id = this.id;
    }
    this.sendForm(data);
  };

  sendForm = (data) => {
    if (!this.userForm.invalid) {
      this.userService
        .addUser(data)
        .toPromise()
        .then((data: any) => {
          this.cancel();
      this.commonToastrService.showSuccess("Added Successfully","User");
        });
    }
  };

  getDepartments=()=>{
    this.userService.getAllDepartments().toPromise().then((data:any[])=>{
       this.departments = data;
    })
  }

  getRoles=()=>{
    this.userService.getAllRoles().toPromise().then((data:any[])=>{
       this.roles = data;
    })
  }

  getOffices=()=>{
    this.userService.getAllOffice().toPromise().then((data:any[])=>{
       this.offices = data;
    })
  }


  cancel = () => {
    this.dialogRef.close(true);
  };

  get basic() {
    return this.userForm.controls;
  }

}

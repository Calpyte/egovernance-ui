import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonToastrService } from '../../../common-shared/common-toastr/common-toastr.service';
import { MultiSelectComponent } from '../../../common-shared/multi-select/multi-select.component';
import { trimValidator } from '../../../common-shared/trim.validator';
import { DistrictService } from '../../location/district/district.service';
import { TalukService } from '../../location/taluk/taluk.service';
import { VillageService } from '../../location/village/village.service';
import { OfficeService } from '../../office/office.service';
import { UserService } from '../../user/user.service';
import { OfficerService } from '../officer.service';

@Component({
  selector: 'ngx-officer-add',
  templateUrl: './officer-add.component.html',
  styleUrls: ['./officer-add.component.scss']
})
export class OfficerAddComponent implements OnInit {
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
  email: String;
  villages:any;
  selectedVillage:any=[];
  options:any = [];
  selectedOption:any = [];
  label:any = "Option";


  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commonToastrService: CommonToastrService,
    private officerService: OfficerService,
    public formBuilder: FormBuilder,
    private userService:UserService,
    private officeService:OfficeService,
    private districtService:DistrictService,
    private villageService:VillageService,
    private talukService:TalukService
  ) { }

   ngOnInit() {
     this.getDepartments();
     this.getRoles();
     this.getVillages();

    this.title = this.data?.title;
    this.userForm = this.formBuilder.group({
      name: ["", [Validators.required, trimValidator]],
      mobileNumber: ["", [Validators.required, trimValidator]],
      email: ["", [Validators.required, Validators.email]],
      isActive: ["", [Validators.required, trimValidator]],
      password: ["", [Validators.required, trimValidator]],
      role:[""],
      office:[""],
    });
    if (this.data.id) {
      this.officerService
        .getOfficerById(this.data?.id)
        .toPromise()
        .then((data: any) => {
          this.selectedDepartments=data.department;
          this.selectedRoles=data?.role;
          this.selectedDepartments= data?.office?.department;
          this.selectedOffices=data?.office;
          this.id = data?.id;
          this.userForm = this.formBuilder.group({
            name: data?.name,
            mobileNumber: data?.mobileNumber,
            email: data?.email,
            password: data?.password,
            isActive:data?.isActive,
            department:this.selectedDepartments,
            role: this.selectedRoles,
            office: this.selectedOffices
          });
        });
    }
    this.isSubmit = false;
  }

  onDepartmentChange=(event:any)=>{
    this.officeService.getOfficesByDepartment(event?.id).toPromise().then((data:any[])=>{
       this.offices = data;
    })
  }

  onRoleChange=(event:any)=>{
    this.options = [];
     if(event?.dataVisibility == 6){
         this.districtService.getAllDistricts().toPromise().then((data:any[])=>{
           this.label= "District";
           this.options = data;
         })
     }else if(event?.dataVisibility == 5){
        this.villageService.getAllVillages().toPromise().then((data:any[])=>{
          this.label= "Village";
          this.options = data;
        })
     }else if(event?.dataVisibility == 4){
       this.talukService.getAllTaluk().toPromise().then((data:any[])=>{
        this.label= "Block"
        this.options = data;
     })
     }
  }

  getVillages=()=>{

  }

  submitForm = () => {
    this.isSubmit = true;
    this.departmentMultiSelectComponent.formInvalid();
    this.rolesMultiSelectComponent.formInvalid();
    this.officesMultiSelectComponent.formInvalid();
    this.saveEvent.emit(true);
    this.userForm.patchValue({
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
      this.officerService
        .addOfficer(data)
        .toPromise()
        .then((data: any) => {
          this.cancel();
      this.commonToastrService.showSuccess("Added Successfully","Officer");
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

import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonToastrService } from '../../../../common-shared/common-toastr/common-toastr.service';
import { MultiSelectComponent } from '../../../../common-shared/multi-select/multi-select.component';
import { AppUserService } from '../app-user.service';

@Component({
  selector: 'ngx-app-user-add',
  templateUrl: './app-user-add.component.html',
  styleUrls: ['./app-user-add.component.scss']
})
export class AppUserAddComponent implements OnInit {
  @ViewChild("departmentMultiSelect", { static: false }) departmentMultiSelectComponent: MultiSelectComponent;
  @ViewChild("rolesMultiSelect", { static: false }) rolesMultiSelectComponent: MultiSelectComponent;
  @Output() saveEvent = new EventEmitter();
  isSubmit: boolean;
  userForm: FormGroup;
  id: string;
  title: string;
  roles: any = [];
  departments: any = [];
  selectedRoles: any = [];
  selectedDepartments: any = [];
  panelOpenState = false;
  isValidFormSubmitted: boolean ;

  constructor(
    public formBuilder: FormBuilder,
    private userService: AppUserService,
    private commonToasterService: CommonToastrService,
    private router: Router,
    public route: ActivatedRoute,
  ) {

   }

  ngOnInit() {
    this.getDepartments();
    this.getRoles();
    this.getValueById();
    this.userForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      mobileNumber:["",Validators.required],
      department:[""],
      role:[""],
      isActive: [false],
      userAddress:this.formBuilder.array([ ],[Validators.required]),
    });
  }

  getValueById(){
    this.id = this.route.snapshot.params.id;
    if(!!this.id){
      this.panelOpenState = true;
      this.userService.getUserById(this.id).toPromise().then((data:any)=>{
        this.selectedDepartments=data.department;
        this.selectedRoles = data.role;
        this.userForm.patchValue({
            name:data?.name,
            mobileNumber:data?.mobileNumber,
            department:this.selectedDepartments,
            role:this.selectedRoles,
            isActive:data?.isActive
        })
        data?.userAddress.forEach(element => {
          const add = this.userForm.get('userAddress') as FormArray;
          add.push(
            this.formBuilder.group({
              doorNo: [element?.doorNo,Validators.required],
              area: [element?.area,Validators.required],
              district:[element?.district,Validators.required],
              state:[element?.state,Validators.required],
              pin:[element?.pin,Validators.required]
            })
          )
        });
      })
    }
  }

  createAddressFormGroup=()=>{
    return this.formBuilder.group({
      doorNo: ["",Validators.required],
      area:["",Validators.required],
      district: ["",Validators.required],
      state: ["",Validators.required],
      pin:["",Validators.required]
		})
  }


  get address(): FormArray {
		return this.userForm.get('userAddress') as FormArray;
	}



  addNewAddressGroup() {
    let fg = this.createAddressFormGroup();
		this.address.push(fg);
  }


  deleteAddressGroup(index: number) {
     this.address.removeAt(index);
  }


  submitForm = () => {
    this.isSubmit = true;
    this.departmentMultiSelectComponent.formInvalid();
    this.rolesMultiSelectComponent.formInvalid();
    this.saveEvent.emit(true);
    this.userForm.patchValue({
      department:this.selectedDepartments,
      role:this.selectedRoles
    })
    let data = this.userForm.value;
    if (this.id) {
      data.id = this.id;
    }
    this.sendForm(data);
  };

  sendForm = (data) => {
     if (!this.userForm.invalid) {
      this.userService.addUser(data).subscribe((data: any) => {
        this.cancel();
        this.commonToasterService.showSuccess("Added Successfully", "User");
     });
     }
  };

  get basic() {
    return this.userForm.controls;
  }

  cancel = () => {
      this.router.navigate(["pages/master/app-user"]);
  };

  getDepartments=()=>{
    this.userService.getAllDepartments().toPromise().then((data:any[])=>{
       this.departments = data;
    })
  }

  getRoles=()=>{
    this.userService.getAllRoles().toPromise().then((data:any[])=>{
      this.roles= data;
    })
  }





}

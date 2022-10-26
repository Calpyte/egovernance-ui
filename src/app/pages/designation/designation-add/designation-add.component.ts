import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonToastrService } from '../../../common-shared/common-toastr/common-toastr.service';
import { MultiSelectComponent } from '../../../common-shared/multi-select/multi-select.component';
import { trimValidator } from '../../../common-shared/trim.validator';
import { UserService } from '../../user/user.service';
import { DesignationService } from '../designation.service';

@Component({
  selector: 'ngx-designation-add',
  templateUrl: './designation-add.component.html',
  styleUrls: ['./designation-add.component.scss']
})
export class DesignationAddComponent implements OnInit {
  @ViewChild("departmentMultiSelect", {static: false}) departmentMultiSelectComponent: MultiSelectComponent;
  @Output() saveEvent = new EventEmitter();
  designationForm: FormGroup;
  title: string;
  id: string;
  isSubmit: boolean;
  departments: any = [];
  selectedDepartments: any = [];

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commonToastrService: CommonToastrService,
    private designationService: DesignationService,
    public formBuilder: FormBuilder,
    private userService:UserService
  ) { }

   ngOnInit() {
     this.getDepartments();
    this.title = this.data?.title;
    this.designationForm = this.formBuilder.group({
      name: ["", [Validators.required, trimValidator]],
      department:[""]
    });
    if (this.data.id) {
      this.designationService
        .getDesignationById(this.data?.id)
        .toPromise()
        .then((data: any) => {
          this.selectedDepartments=data.department;
          this.id = data?.id;
          this.designationForm = this.formBuilder.group({
            name: data?.name,
            department:this.selectedDepartments
          });
        });
    }
    this.isSubmit = false;
  }

  submitForm = () => {
    this.isSubmit = true;
    this.departmentMultiSelectComponent.formInvalid();
    this.saveEvent.emit(true);
    this.designationForm.patchValue({
      department: this.selectedDepartments,
    })
    let data = this.designationForm?.value;
    if (this.id) {
      data.id = this.id;
    }
    this.sendForm(data);
  };

  sendForm = (data) => {
    if (!this.designationForm.invalid) {
      this.designationService
        .addDesignation(data)
        .toPromise()
        .then((data: any) => {
          this.cancel();
      this.commonToastrService.showSuccess("Added Successfully","Designation");
        });
    }
  };

  getDepartments=()=>{
    this.userService.getAllDepartments().toPromise().then((data:any[])=>{
       this.departments = data;
    })
  }

  cancel = () => {
    this.dialogRef.close(true);
  };

  get basic() {
    return this.designationForm.controls;
  }
}

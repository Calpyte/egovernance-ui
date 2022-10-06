import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonToastrService } from '../../../common-shared/common-toastr/common-toastr.service';
import { MultiSelectComponent } from '../../../common-shared/multi-select/multi-select.component';
import { trimValidator } from '../../../common-shared/trim.validator';
import { OfficeService } from '../office.service';

@Component({
  selector: 'ngx-office-add',
  templateUrl: './office-add.component.html',
  styleUrls: ['./office-add.component.scss']
})
export class OfficeAddComponent implements OnInit {

  @ViewChild("departmentMultiSelect", { static: false }) departmentMultiSelectComponent: MultiSelectComponent;
  @Output() saveEvent = new EventEmitter();
  title: String;
  officeForm: FormGroup;
  id: String;
  isSubmit: boolean;
  departments: any = [];
  selectedDepartments: any = [];

  constructor(
    public dialogRef: MatDialogRef<any>,  
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commonToastrService: CommonToastrService,
    private officeService: OfficeService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getDepartments();
    this.title = this.data?.title;
    this.officeForm = this.formBuilder.group({
      name: ["", [Validators.required, trimValidator]],
      description: ["", [Validators.required, trimValidator]],
      lat: ["", [Validators.required, trimValidator]],
      lon: ["", [Validators.required, trimValidator]],
      department:[""],
    });
    if (this.data.id) {
      this.officeService
        .getOfficeById(this.data?.id)
        .toPromise()
        .then((data: any) => {
          this.selectedDepartments=data.department;
          this.id = data?.id;
          this.officeForm.patchValue({ 
            name: data?.name,
            description: data?.description,
            lat: data?.lat,
            lon: data?.lon,
            department:this.selectedDepartments
          });
        });
    }
    this.isSubmit = false;
  }

    submitForm = () => {
      this.isSubmit = true; 
      // this.departmentMultiSelectComponent.formInvalid();
      this.saveEvent.emit(true);
      this.officeForm.patchValue({
        department: this.selectedDepartments
      })
      let data = this.officeForm?.value;
      if (this.id) {
        data.id = this.id;  
      }
      // data['isDeleted']= false;
      this.sendForm(data);
    };
  
    sendForm = (data) => {
      if (!this.officeForm.invalid) {
        this.officeService
          .addOffice(data)
          .toPromise()
          .then((data: any) => {
            this.cancel();
        this.commonToastrService.showSuccess("Added Successfully","Office");
          });
      }
    };
    getDepartments=()=>{
      this.officeService.getAllDepartments().toPromise().then((data:any[])=>{
         this.departments = data;
      })
    }
    
    get basic() {
      return this.officeForm.controls;
    }

  cancel = () => {
    this.dialogRef.close(true);
  };

  }


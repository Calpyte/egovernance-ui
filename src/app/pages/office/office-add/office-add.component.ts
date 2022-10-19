import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  @Output() saveEvent = new EventEmitter();
  title: String;
  officeForm: FormGroup;
  id: String;
  isSubmit: boolean;
  departments: any = [];
  selectedDepartments: any = [];
  departmentControl = new FormControl("",Validators.required);

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
      department:this.departmentControl,
    });
    if (this.data.id) {
      this.officeService.getOfficeById(this.data?.id).subscribe((data:any)=>{
        this.id = data?.id;
        this.officeForm = this.formBuilder.group({
          name: data?.name,
          description: data?.description,
          lat: data?.lat,
          lon: data?.lon,
          department:this.departmentControl.setValue(data?.department)
      });
    });
    }
    this.isSubmit = false;
  }

  onSelectionChange(event:any){
   this.selectedDepartments = event;
  }
    submitForm = () => {
      this.isSubmit = true;
      this.saveEvent.emit(true);
      this.officeForm.patchValue({
        department : this.selectedDepartments
      })
      let data = this.officeForm?.value;

      if (this.id) {
        data.id = this.id;
      }
      console.log(data);
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


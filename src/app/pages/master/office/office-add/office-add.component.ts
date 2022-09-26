import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonToastrService } from '../../../../common-shared/common-toastr/common-toastr.service';
import { MultiSelectComponent } from '../../../../common-shared/multi-select/multi-select.component';
import { trimValidator } from '../../../../common-shared/trim.validator';
import { OfficeService } from '../office.service';

@Component({
  selector: 'ngx-office-add',
  templateUrl: './office-add.component.html',
  styleUrls: ['./office-add.component.scss']
})
export class OfficeAddComponent implements OnInit {
  // @ViewChild("departmentMultiSelect", { static: false }) departmentMultiSelectComponent: MultiSelectComponent;
  @Output() saveEvent = new EventEmitter();
  title: string;
  isSubmit: boolean;
  officeForm:FormGroup;
  data: any;
  lat: number;
  lon: number;
  // departments: any = [];
  // selectedDepartments: any = [];
  id: String;
  // panelOpenState = false;



  constructor(
    private officeService: OfficeService,
    public dialogRef: MatDialogRef<any>,
    public formBuilder: FormBuilder,
    private commonToastrService: CommonToastrService,
    private router: Router,
    public route: ActivatedRoute,
    ) { }

  ngOnInit() {
    // this.getDepartments;
    this.title = this.data?.title;
    this.officeForm = this.formBuilder.group({
      name: ["", [Validators.required, trimValidator]],
      description: ["", [Validators.required, trimValidator]],
      latitude: ["", [Validators.required, trimValidator]],
      longitude: ["", [Validators.required, trimValidator]],
      // department:[""],
  });

  // if (this.data.id) {
  //   this.officeService
  //     .getDepartmentById(this.data?.id)
  //     .toPromise()
  //     .then((data: any) => {
  //       this.id = data?.id;
  //       this.officeForm.patchValue({ name: data?.name });
  //     });
  // }
  // this.isSubmit = false;
}


submitForm = () => {
  this.isSubmit = true;
  // this.departmentMultiSelectComponent.formInvalid();
  this.saveEvent.emit(true);
  // this.officeForm.patchValue({
  //   department:this.selectedDepartments,
  // })
  let data = this.officeForm.value;
  if (this.id) {
    data.id = this.id;
  }
  this.sendForm(data);
};


  sendForm = (data) => {
    if (!this.officeForm.invalid) {
      this.officeService.addOffice(data) .toPromise().then((data: any) => {
          this.cancel();
      this.commonToastrService.showSuccess("Added Successfully","Office");
        });
    }
  };
  get basic() {
    return this.officeForm.controls;
  }
  cancel = () => {
    this.dialogRef.close(true);
  };

  // getDepartments=()=>{
  //   this.officeService.getAllDepartments().toPromise().then((data:any[])=>{
  //      this.departments = data;
  //   })
  // }


}

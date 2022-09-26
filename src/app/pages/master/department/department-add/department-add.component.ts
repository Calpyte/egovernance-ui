import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonToastrService } from '../../../../common-shared/common-toastr/common-toastr.service';
import { trimValidator } from '../../../../common-shared/trim.validator';
import { DepartmentService } from '../department.service';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";


@Component({
  selector: 'ngx-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.scss']
})
export class DepartmentAddComponent implements OnInit {

  @Output() saveEvent = new EventEmitter();
  departmentForm: FormGroup;
  title: string;
  id: string;
  isSubmit: boolean;


  constructor(
    private departmentService: DepartmentService,
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commonToastrService: CommonToastrService
  ) {}

  ngOnInit() {
    this.title = this.data?.title;
    this.departmentForm = this.formBuilder.group({
      name: ["", [Validators.required, trimValidator]],
    });
    if (this.data.id) {
      this.departmentService
        .getDepartmentById(this.data?.id)
        .toPromise()
        .then((data: any) => {
          this.id = data?.id;
          this.departmentForm.patchValue({ name: data?.name });
        });
    }
    this.isSubmit = false;
  }
  submitForm = () => {
    this.isSubmit = true;
    this.saveEvent.emit(true);
    let data = this.departmentForm?.value;
    if (this.id) {
      data.id = this.id;
    }
    this.sendForm(data);
  };
  sendForm = (data) => {
    if (!this.departmentForm.invalid) {
      this.departmentService
        .addDepartment(data)
        .toPromise()
        .then((data: any) => {
          this.cancel();
      this.commonToastrService.showSuccess("Added Successfully","Department");
        });
    }
  };
  get basic() {
    return this.departmentForm.controls;
  }
  cancel = () => {
    this.dialogRef.close(true);
  };

}

import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { AppConfiguration } from '../../../common-shared/AppConfiguration';
import { CommonToastrService } from '../../../common-shared/common-toastr/common-toastr.service';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'ngx-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.scss']
})
export class DepartmentAddComponent implements OnInit {
  @Output() saveEvent = new EventEmitter();
  isSubmit: boolean;
  imageUploaded: boolean = false;
  departmentModel: any;
  id: string;
  title: string;
  test: string;
  fileName: string;
  url: string;
  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commonToastrService: CommonToastrService,
    private departmentService: DepartmentService
  ) {}
  async ngOnInit() {
    this.title = this.data?.title;
    this.departmentModel = {
      name:"",
    };
    let departmentData=await this.departmentService.getDepartmentById(this.data.id).toPromise();
    if(!!departmentData){
      this.departmentModel=departmentData;
    }

    this.isSubmit = false;
  }

   submitForm = async(data:NgForm) => {
    if(data.valid){
      this.isSubmit = true;

      await this.sendForm();
      this.saveEvent.emit(true);
    }

  };

  sendForm = async() => {
    let res=await this.departmentService.addDepartment(this.departmentModel).toPromise().then((res)=>{
      this.commonToastrService.showSuccess("Saved SuccessFully","Department");
    });
    this.cancel();
  };

  cancel = () => {
    this.dialogRef.close(true);
  };
}

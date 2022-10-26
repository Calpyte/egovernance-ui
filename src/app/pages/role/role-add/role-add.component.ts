import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { threadId } from 'worker_threads';
import { CommonToastrService } from '../../../common-shared/common-toastr/common-toastr.service';
import { MultiSelectComponent } from '../../../common-shared/multi-select/multi-select.component';
import { trimValidator } from '../../../common-shared/trim.validator';
import { RoleService } from '../role.service';

@Component({
  selector: 'ngx-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.scss']
})
export class RoleAddComponent implements OnInit {
  @ViewChild("visibilityMultiSelect", { static: false }) visibilityMultiSelectComponent: MultiSelectComponent;
  @Output() saveEvent = new EventEmitter();
  roleForm: FormGroup;
  title: string;
  id: string;
  isSubmit: boolean;
  visibilities:any=[
  {"id":"1","name":"All"},
  {"id":"2","name":"Individual"},
  {"id":"3","name":"Office"},
  {"id":"4","name":"Block"},
  {"id":"5","name":"Village"},
  {"id":"6","name":"District"}
];
  selectedVisibility:any = [];
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commonToastrService: CommonToastrService,
    private roleService: RoleService,
    public formBuilder: FormBuilder
    ) { }

    ngOnInit() {
      this.title = this.data?.title;
      this.roleForm = this.formBuilder.group({
        name: ["", [Validators.required, trimValidator]],
        dataVisibility:[""]
      });
      if (this.data.id) {
        this.roleService
          .getRoleById(this.data?.id)
          .toPromise()
          .then((data: any) => {
            this.id = data?.id;
            this.selectedVisibility = data?.dataVisibility;
            this.roleForm.patchValue({ name: data?.name,dataVisibility:this.selectedVisibility});
          });
      }
      this.isSubmit = false;
    }

    submitForm = () => {
      this.isSubmit = true;
      this.visibilityMultiSelectComponent.formInvalid();
      this.saveEvent.emit(true);
      this.roleForm.patchValue({dataVisibility:this.selectedVisibility})
      let data = this.roleForm?.value;
      if (this.id) {
        data.id = this.id;
      }
      this.sendForm(data);
    };
    sendForm = (data) => {
      if (!this.roleForm.invalid) {
        this.roleService
          .addRole(data)
          .toPromise()
          .then((data: any) => {
            this.cancel();
        this.commonToastrService.showSuccess("Added Successfully","Role");
          });
      }
    };
    get basic() {
      return this.roleForm.controls;
    }

  cancel = () => {
    this.dialogRef.close(true);
  };


}

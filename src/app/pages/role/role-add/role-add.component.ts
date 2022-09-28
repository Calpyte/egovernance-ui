import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonToastrService } from '../../../common-shared/common-toastr/common-toastr.service';
import { trimValidator } from '../../../common-shared/trim.validator';
import { RoleService } from '../role.service';

@Component({
  selector: 'ngx-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.scss']
})
export class RoleAddComponent implements OnInit {

  @Output() saveEvent = new EventEmitter();
  roleForm: FormGroup;
  title: string;
  id: string;
  isSubmit: boolean;

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
      });
      if (this.data.id) {
        this.roleService
          .getRoleById(this.data?.id)
          .toPromise()
          .then((data: any) => {
            this.id = data?.id;
            this.roleForm.patchValue({ name: data?.name });
          });
      }
      this.isSubmit = false;
    }

    submitForm = () => {
      this.isSubmit = true;
      this.saveEvent.emit(true);
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

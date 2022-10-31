import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {  Observable } from 'rxjs';
import { CommonToastrService } from '../../../../common-shared/common-toastr/common-toastr.service';
import { trimValidator } from '../../../../common-shared/trim.validator';
import { LocationService } from '../../location.service';
import { StateService } from '../state.service';

@Component({
  selector: 'ngx-state-add',
  templateUrl: './state-add.component.html',
  styleUrls: ['./state-add.component.scss']
})
export class StateAddComponent implements OnInit {

  @Input() events: Observable<void>;
  @Output() saveEvent = new EventEmitter();
  isSubmit: boolean = false;
  stateForm: FormGroup;
  id: string;
  title: string;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public formBuilder: FormBuilder,
    private stateService: StateService,
    private locationService: LocationService,
    private commonToastrService:CommonToastrService
    ) { }

  ngOnInit() {
    this.title = this.data?.title;
    this.stateForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*"), trimValidator]],
    });
    if (this.data?.id) {
      this.stateService.getStateById(this.data?.id).toPromise().then((data:any)=>{
        this.id = data?.id;
        this.stateForm.patchValue({
          name: data?.name,
        });
      })
    }
    this.isSubmit = false;
  }

  submitForm = () => {
    this.isSubmit = true;
    this.saveEvent.emit(true);
    let stateData = this.stateForm.value;
    if (this.id) {
      stateData.id = this.id;
    }
    this.sendForm(stateData);
    console.log(stateData);
  };

  sendForm = (data) => {
    if (!this.stateForm.invalid) {
      this.stateService.addState(data).subscribe((data: any) => {
          this.cancel();
          this.commonToastrService.showSuccess('Your information has been saved successfully!','State Added');
      });
    }
  };

  get basic() {
    return this.stateForm.controls;
  }

  public onSelect(item) {
    console.log('tag selected: value is ' + item);
  }
  cancel = () => {
    this.dialogRef.close(true);
  }

}

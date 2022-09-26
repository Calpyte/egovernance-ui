import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonToastrService } from '../../../../common-shared/common-toastr/common-toastr.service';
import { trimValidator } from '../../../../common-shared/trim.validator';
import { CountryService } from '../country.service';

@Component({
  selector: 'ngx-country-add',
  templateUrl: './country-add.component.html',
  styleUrls: ['./country-add.component.scss']
})
export class CountryAddComponent implements OnInit {

  @Output() saveEvent = new EventEmitter();
  countryForm: FormGroup;
  title: string;
  id: string;
  isSubmit: boolean;

  constructor(
    private countryService: CountryService,
    public dialogRef: MatDialogRef<any>,
    public formBuilder: FormBuilder,
    private commonToastrService: CommonToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
    this.title = this.data?.title;
    this.countryForm = this.formBuilder.group({
      name: ["", [Validators.required, trimValidator]],
    });
    if (this.data.id) {
      this.countryService
        .getCountryById(this.data?.id)
        .toPromise()
        .then((data: any) => {
          this.id = data?.id;
          this.countryForm.patchValue({ name: data?.name });
        });
    }
    this.isSubmit = false;
  }
  submitForm = () => {
    this.isSubmit = true;
    this.saveEvent.emit(true);
    let data = this.countryForm?.value;
    if (this.id) {
      data.id = this.id;
    }
    this.sendForm(data);
  };
  sendForm = (data) => {
    if (!this.countryForm.invalid) {
      this.countryService
        .addCountry(data)
        .toPromise()
        .then((data: any) => {
          this.cancel();
      this.commonToastrService.showSuccess("Added Successfully","Country");
        });
    }
  };
  

  cancel = () => {
    this.dialogRef.close(true);
  };

  get basic() {
    return this.countryForm.controls;
  }

}

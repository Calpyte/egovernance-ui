import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  isSubmit: boolean;
  countryForm: FormGroup;
  id: string;
  title: string;

  constructor(public formBuilder: FormBuilder, public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, private countryService: CountryService,
   private commonToastrService:CommonToastrService) {
  }

  ngOnInit() {
    this.title = this.data?.title;
    this.countryForm = this.formBuilder.group({
      name: ['', [Validators.required, trimValidator]],
    });
    if (this.data.id) {
      this.countryService.getCountryById(this.data?.id).toPromise().then((data: any) => {
        this.id = data?.id;
        this.countryForm.setValue({ name: data?.name });
      })
    }
    this.isSubmit = false;

  }

  submitForm = () => {
    this.isSubmit = true;
    this.saveEvent.emit(true);
    let countryData = this.countryForm.value;
    if (this.id) {
      countryData.id = this.id;
    }
    this.sendForm(countryData);
  };

  sendForm = (data) => {
    if (!this.countryForm.invalid) {
      this.countryService.addCountry(data).toPromise().then((data: any) => {
        this.cancel();
          this.commonToastrService.showSuccess(
            'Your information has been saved successfully!', 'Country Added');
      });
    }
  };

  get basic() {
    return this.countryForm.controls;
  }

  cancel = () => {
    this.dialogRef.close(true);
  }

  public onSelect(item) {
    console.log('tag selected: value is ' + item);
  }

}

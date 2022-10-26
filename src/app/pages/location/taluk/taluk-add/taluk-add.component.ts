import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, Form } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CommonToastrService } from '../../../../common-shared/common-toastr/common-toastr.service';
import { trimValidator } from '../../../../common-shared/trim.validator';
import { LocationService } from '../../location.service';
import { TalukService } from '../taluk.service';

@Component({
  selector: 'ngx-taluk-add',
  templateUrl: './taluk-add.component.html',
  styleUrls: ['./taluk-add.component.scss']
})
export class TalukAddComponent implements OnInit {

  public event: EventEmitter<any> = new EventEmitter();
  @Input() events: Observable<void>;
  @Output() saveEvent = new EventEmitter();
  countryControl:FormControl = new FormControl("",Validators.required);
  stateControl:FormControl = new FormControl("",Validators.required);
  districtControl:FormControl = new FormControl("",Validators.required);
  isSubmit: boolean = false;
  talukForm: FormGroup;
  id: string;
  title: string;
  countries = [];
  states = [];
  districts = [];
  selectedCountry: any;
  selectedState: any;
  selectedDistrict: any;

  constructor(public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private talukService: TalukService,
    private locationService: LocationService,
    private commonToastrService:CommonToastrService) { }

  ngOnInit() {
    this.getCountries();
    this.title = this.data?.title;
    this.talukForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*"), trimValidator]],
      country: this.countryControl,
      state: this.stateControl,
      district:this.districtControl
    });
    if (this.data.id) {
      this.talukService.getTalukById(this.data?.id).toPromise().then((data:any)=>{
        this.id = data?.id;
        this.getStates(data?.district?.state?.country?.id);
        this.getDistricts(data?.district?.state?.id);
        this.talukForm.patchValue({
          country:  data?.district?.state?.country,
          state: data?.district?.state,
          district: data?.district,
          name: data?.name
        });
      })
    }
  }

  onDistrictChange=(event)=>{
    this.selectedDistrict = event;
  }

  changeState = (event) => {
    this.selectedCountry = event;
    this.stateControl.setValue("");
    this.getStates(event?.id);
  }
  changeDistrict = (event) => {
    this.selectedState = event;
    this.districtControl.setValue("");
    this.getDistricts(event?.id);

  }

  getCountries = () => {
    this.locationService.getAllCountries().subscribe((data: any[]) => {
      this.countries = data;
    })
  }

  getStates = (id) => {
    this.locationService.getAllStateByCountry(id).subscribe((data: any[]) => {
      this.states = data;
    })
  }
  getDistricts = (id) => {
    this.locationService.getAllDistrictByState(id).subscribe((data: any[]) => {
      this.districts = data;
    })
  }

  submitForm = () => {
    this.isSubmit = true;
    this.saveEvent.emit(true);
    let talukData = this.talukForm.value;
    if (this.id) {
      talukData.id = this.id;
    }
    this.sendForm(talukData);
  };

  sendForm = (data) => {
    if (!this.talukForm.invalid) {
      this.talukService.addTaluk(data).subscribe((data: any[]) => {
        this.cancel();
        this.commonToastrService.showSuccess('Your information has been saved successfully!','Taluk Added');
      });
    }
  };
  get basic() {
    return this.talukForm.controls;
  }

  triggerEvent = () => {
    this.event.emit({ data: true });
  }
  cancel = () => {
    this.dialogRef.close(true);
  }

}

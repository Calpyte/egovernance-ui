import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, Observable } from 'rxjs';
import { CommonToastrService } from '../../../../common-shared/common-toastr/common-toastr.service';
import { trimValidator } from '../../../../common-shared/trim.validator';
import { LocationService } from '../../location.service';
import { DistrictService } from '../district.service';

@Component({
  selector: 'ngx-district-add',
  templateUrl: './district-add.component.html',
  styleUrls: ['./district-add.component.scss']
})
export class DistrictAddComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  protected _onDestroy = new Subject<void>();
  @Input() events: Observable<void>;
  @Output() saveEvent = new EventEmitter();
  // countryControl:FormControl = new FormControl("",Validators.required);
  stateControl:FormControl = new FormControl("",Validators.required);


  isSubmit: boolean = false;
  districtForm: FormGroup;
  id: string;
  title: string;
  // countries = [];
  // selectedCountry: any;
  states = [];
  selectedState: any;
  constructor(public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private districtService: DistrictService,
    private locationService: LocationService,
    private commonToastrService: CommonToastrService,
    ) { }

  ngOnInit() {
    this.title = this.data?.title;
    // this.getCountries();
    this.districtForm = this.formBuilder.group({
      name: ['', [Validators.required, trimValidator]],
      // country: this.countryControl,
      state: this.stateControl
    });
    if (this.data.id) {
      this.districtService.getDistrictById(this.data?.id).toPromise().then((data:any)=>{
        this.id = data?.id;
        this.getStates(data?.state?.country.id)
        this.districtForm.patchValue({
          // country: data?.state?.country,
          state: data?.state,
          name: data?.name
        });
      })
    }
  }



  // getCountries = () => {
  //   this.locationService.getAllCountries().subscribe((data: any[]) => {
  //     this.countries = data;
  //   })
  // }

  changeState = (event:any)=>{
    this.stateControl.setValue("");
    // this.selectedCountry = event;
    this.getStates(event?.id)
  }

  onStateChange(event){
    this.selectedState = event;
 }


  getStates = (event:any) => {
    this.locationService.getAllStateByCountry(event).subscribe((data: any[]) => {
      this.states = data;
    });
  }
  submitForm = () => {
    this.isSubmit = true;
    this.saveEvent.emit(true);
    let districtData = this.districtForm.value;
    if (this.id) {
      districtData.id = this.id;
    }
    this.sendForm(districtData);
  };

  sendForm = (data) => {
      if (!this.districtForm.invalid) {
        this.districtService.addDistrict(data).subscribe(() => {
            this.cancel();
            this.commonToastrService.showSuccess('Your information has been saved successfully!','District Added');

        });
      }
  };

  get basic() {
    return this.districtForm.controls;
  }

  triggerEvent = () => {
    this.event.emit({ data: true });
  }
  cancel = () => {
    this.dialogRef.close(true);
  }
  public objectComparisonFunction = function (option, value): boolean {
    return option.id === value.id;
  }
  ngOnDestroy = () =>  {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

}

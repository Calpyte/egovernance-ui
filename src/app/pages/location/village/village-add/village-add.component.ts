import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, Observable, Subject } from 'rxjs';
import { CommonToastrService } from '../../../../common-shared/common-toastr/common-toastr.service';
import { trimValidator } from '../../../../common-shared/trim.validator';
import { LocationService } from '../../location.service';
import { VillageService } from '../village.service';

@Component({
  selector: 'ngx-village-add',
  templateUrl: './village-add.component.html',
  styleUrls: ['./village-add.component.scss']
})
export class VillageAddComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  countryControl:FormControl = new FormControl("",Validators.required);
  stateControl:FormControl = new FormControl("",Validators.required);
  districtControl:FormControl = new FormControl("",Validators.required);
  talukControl:FormControl = new FormControl("",Validators.required);
  @Input() events: Observable<void>;
  @Output() saveEvent = new EventEmitter();
  protected _onDestroy = new Subject<void>();
  isSubmit: boolean = false;
  villageForm: FormGroup;
  id: string;
  title: string;
  countries = [];
  states = [];
  districts = [];
  taluks = [];
  selectedCountry: any;
  selectedState: any;
  selectedDistrict: any;
  selectedTaluk: any;

  constructor(public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private villageService: VillageService,
    private locationService: LocationService,
    private commonToastrService: CommonToastrService,
   ) {

  }

  ngOnInit() {
    this.getCountries();
    this.title = this.data?.title;
    this.villageForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*"), trimValidator]],
      country: this.countryControl,
      state: this.stateControl,
      district: this.districtControl,
      taluk: this.talukControl
    });
    if (this.data?.id) {
      this.villageService.getVillageById(this.data?.id).subscribe((data: any) => {
        this.id = data?.id;
        this.getStates(data?.taluk?.district?.state?.country?.id);
        this.getDistricts(data?.taluk?.district?.state?.id);
        this.getTaluk(data?.taluk?.district?.id);
        this.villageForm.patchValue({
          country: data?.taluk?.district?.state?.country,
          state: data?.taluk?.district?.state,
          district: data?.taluk?.district,
          taluk: data?.taluk,
          name: data?.name
        });
      })
    }
  }

  onTalukChange=(event)=>{
      this.selectedTaluk = event;
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

  getTaluk = (id) => {
    this.locationService.getAllTalukByDistrict(id).subscribe((data: any[]) => {
      this.taluks = data;
    })
  }
  changeState = (event) => {
      this.selectedCountry = event;
      this.stateControl.setValue("");
      this.getStates(event?.id);
  }
  changeDistrict = (event) => {
    this.districtControl.setValue("");
    this.selectedState = event;
    this.getDistricts(event?.id);
  }

  changeTaluk = (event) => {
    this.talukControl.setValue("");
    this.selectedDistrict = event;
    this.getTaluk(event?.id);
  }

  submitForm = () => {
    this.isSubmit = true;
    this.saveEvent.emit(true);
    let villageData = this.villageForm.value;
    if (this.id) {villageData.id = this.id}
    this.sendForm(villageData);
  };

  sendForm = (data) => {
    if (!this.villageForm.invalid) {
      this.villageService.addVillage(data).subscribe((data: any) => {
          this.cancel();
          this.commonToastrService.showSuccess('Your information has been saved successfully!','Village Added');
      });
    }
  };

  get basic() {
    return this.villageForm.controls;
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
  ngOnDestroy = () => {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

}

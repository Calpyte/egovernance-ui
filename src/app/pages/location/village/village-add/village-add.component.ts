import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, Observable, Subject } from 'rxjs';
import { TemperatureHumidityService } from '../../../../@core/mock/temperature-humidity.service';
import { CommonToastrService } from '../../../../common-shared/common-toastr/common-toastr.service';
import { MultiSelectComponent } from '../../../../common-shared/multi-select/multi-select.component';
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
  @ViewChild("districtMultiSelect", { static: false }) districtMultiSelectComponent: MultiSelectComponent;
  @ViewChild("stateMultiSelect", { static: false }) stateMultiSelectComponent: MultiSelectComponent;
  @ViewChild("selectedTaluk", { static: false }) talukMultiSelectComponent: MultiSelectComponent;
  @Input() events: Observable<void>;
  @Output() saveEvent = new EventEmitter();
  protected _onDestroy = new Subject<void>();
  isSubmit: boolean = false;
  villageForm: FormGroup;
  id: string;
  title: string;
  states = [];
  districts = [];
  taluks = [];
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
    this.getAllStates();
    this.getAllDistricts();
    this.getAllTaluks();
    this.title = this.data?.title;
    this.villageForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*"), trimValidator]],
      state:[""],
      district:[""],
      taluk:[""]
    });
    if (this.data?.id) {
      this.villageService.getVillageById(this.data?.id).subscribe((data: any) => {
        this.id = data?.id;
        this.selectedState=data.state;
        this.selectedDistrict=data.district;
        this.selectedTaluk=data.taluk;
        this.villageForm.patchValue({
          state:this.selectedState,
          district:this.selectedDistrict,
          taluk:this.selectedTaluk
        });
      })
    }
  }

  onTalukChange=(event)=>{
      this.selectedTaluk = event;
  }

  // changeState = (event) => {
  //     // this.selectedCountry = event;
  //     this.selectedState.setValue("");
  //     this.getStates(event?.id);
  // }
  // changeDistrict = (event) => {
  //   this.selectedDistrict.setValue("");
  //   this.selectedState = event;
  //   this.getDistricts(event?.id);
  // }

  // changeTaluk = (event) => {
  //   this.selectedTaluk.setValue("");
  //   this.selectedDistrict = event;
  //   this.getTaluk(event?.id);
  // }

  changeState = (event) => {
    // this.selectedCountry = event;
    this.selectedState.setValue("");
    // this.getAllStates(event?.id);
}
changeDistrict = (event) => {
  this.selectedDistrict.setValue("");
  this.selectedState = event;
  // this.getAllDistricts(event?.id);
}

changeTaluk = (event) => {
  this.selectedTaluk.setValue("");
  this.selectedDistrict = event;
  // this.getAllTaluks(event?.data);
}

  submitForm = () => {
    this.isSubmit = true;
    this.stateMultiSelectComponent.formInvalid();
    this.districtMultiSelectComponent.formInvalid();
    // this.talukMultiSelectComponent.formInvalid();
    this.saveEvent.emit(true);
    this.villageForm.patchValue({
      state:this.selectedState,
      district:this.selectedDistrict,
      taluk:this.selectedTaluk
    });
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

  getAllStates=()=>{
    this.villageService.getAllStates().toPromise().then((data:any[])=>{
       this.states = data;
    })
  }

  getAllDistricts=()=>{
    this.villageService.getAllDistricts().toPromise().then((data:any[])=>{
       this.districts = data;
    })
  }

  getAllTaluks=()=>{
    this.villageService.getAllTaluks().toPromise().then((data:any[]) => {
      this.taluks = data;
    })
  }

}

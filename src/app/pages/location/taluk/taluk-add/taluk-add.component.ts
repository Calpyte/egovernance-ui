import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, Form } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CommonToastrService } from '../../../../common-shared/common-toastr/common-toastr.service';
import { MultiSelectComponent } from '../../../../common-shared/multi-select/multi-select.component';
import { trimValidator } from '../../../../common-shared/trim.validator';
import { LocationService } from '../../location.service';
import { TalukService } from '../taluk.service';

@Component({
  selector: 'ngx-taluk-add',
  templateUrl: './taluk-add.component.html',
  styleUrls: ['./taluk-add.component.scss']
})
export class TalukAddComponent implements OnInit {

  @ViewChild("districtMultiSelect", { static: false }) districtMultiSelectComponent: MultiSelectComponent;
  @ViewChild("stateMultiSelect", { static: false }) stateMultiSelectComponent: MultiSelectComponent;

  public event: EventEmitter<any> = new EventEmitter();
  @Input() events: Observable<void>;
  @Output() saveEvent = new EventEmitter();

  isSubmit: boolean = false;
  talukForm: FormGroup;
  id: string;
  title: string;
  states = [];
  districts = [];
  selectedState: any;
  selectedDistrict: any;

  constructor(public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private talukService: TalukService,
    private locationService: LocationService,
    private commonToastrService:CommonToastrService) { }

  ngOnInit() {
    this.getAllDistricts();
    this.getAllStates();
    this.title = this.data?.title;
    this.talukForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*"), trimValidator]],
      state:[""],
      district:[""],
    });
    if (this.data.id) {
      this.talukService.getTalukById(this.data?.id).toPromise().then((data:any)=>{
        this.id = data?.id;
        this.selectedState=data.state;
        this.selectedDistrict=data.district;
        this.talukForm.patchValue({
          state:this.selectedState,
          district:this.selectedDistrict,
          name: data?.name
        });
      })
    }
  }

  onDistrictChange=(event)=>{
    this.selectedDistrict = event;
  }

  // changeState = (event) => {
  //   // this.selectedCountry = event;
  //   this.selectedState.setValue("");
  //   this.getAllStates(event?.id);
  // }
  // changeDistrict = (event) => {
  //   this.selectedState = event;
  //   this.selectedDistrict.setValue("");
  //   this.getAllDistricts(event?.id);

  // }

  // getStates = (id) => {
  //   this.locationService.getAllStateByCountry(id).subscribe((data: any[]) => {
  //     this.states = data;
  //   })
  // }
  // getDistricts = (id) => {
  //   this.locationService.getAllDistrictByState(id).subscribe((data: any[]) => {
  //     this.districts = data;
  //   })
  // }

  submitForm = () => {
    this.isSubmit = true;
    this.stateMultiSelectComponent.formInvalid();
    this.districtMultiSelectComponent.formInvalid();
    this.saveEvent.emit(true);
    this.talukForm.patchValue({
      state:this.selectedState,
      district:this.selectedDistrict
    });
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

  getAllStates=()=>{
    this.talukService.getAllStates().toPromise().then((data:any[])=>{
       this.states = data;
    })
  }

  getAllDistricts=()=>{
    this.talukService.getAllDistricts().toPromise().then((data:any[])=>{
       this.districts = data;
    })
  }

}

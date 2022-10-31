import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, Observable } from 'rxjs';
import { CommonToastrService } from '../../../../common-shared/common-toastr/common-toastr.service';
import { MultiSelectComponent } from '../../../../common-shared/multi-select/multi-select.component';
import { trimValidator } from '../../../../common-shared/trim.validator';
import { LocationService } from '../../location.service';
import { DistrictService } from '../district.service';

@Component({
  selector: 'ngx-district-add',
  templateUrl: './district-add.component.html',
  styleUrls: ['./district-add.component.scss']
})
export class DistrictAddComponent implements OnInit {

  @ViewChild("stateMultiSelect", { static: false }) stateMultiSelectComponent: MultiSelectComponent;

  public event: EventEmitter<any> = new EventEmitter();
  protected _onDestroy = new Subject<void>();
  @Input() events: Observable<void>;
  @Output() saveEvent = new EventEmitter();

  isSubmit: boolean = false;
  districtForm: FormGroup;
  id: string;
  title: string;
  states = [];
  selectedState: any;
  datatrigger: any;
  constructor(public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private districtService: DistrictService,
    private locationService: LocationService,
    private commonToastrService: CommonToastrService,
    ) { }

  ngOnInit() {
    this.getAllStates();
    this.title = this.data?.title;
    this.districtForm = this.formBuilder.group({
      name: ['', [Validators.required, trimValidator]],
      state:[""]
    });
    if (this.data.id) {
      this.districtService.getDistrictById(this.data?.id).toPromise().then((data:any)=>{
        this.id = data?.id;
        this.selectedState=data?.state;
        this.districtForm.patchValue({
          state:this?.selectedState

        });
      })
    }
  }

  changeState = (event:any)=>{
    this.selectedState = event;
    this.selectedState.setValue("");
    // this.getStates(event?.id)
  }

  onSelectionChange (event){
    this.selectedState = event;
 }

//  getStates  =  () =>  {
//   this.districtService.getAllStates().subscribe((data: any[]) => {
//     this.states = data;
//     this.datatrigger.emit(this.states);
//   })
// }
getStates  =  () =>  {
  this.locationService.getAllStates().subscribe((data: any[]) => {
    this.states = data;
    this.datatrigger.emit(this.states);
  })
}

  submitForm = () => {
    this.isSubmit = true;
    this.stateMultiSelectComponent.formInvalid();
    this.saveEvent.emit(true);
    this.districtForm.patchValue({
      state:this.selectedState
    });
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

  getAllStates=()=>{
    this.districtService.getAllStates().toPromise().then((data:any[])=>{
       this.states = data;
    })
  }

  saveState= (value: any) => {
    this.selectedState = value;
  }

}

import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonToastrService } from '../../../common-shared/common-toastr/common-toastr.service';
import { MultiSelectComponent } from '../../../common-shared/multi-select/multi-select.component';
import { trimValidator } from '../../../common-shared/trim.validator';
import { LocationService } from '../../location/location.service';
import { OfficeService } from '../office.service';

@Component({
  selector: 'ngx-office-add',
  templateUrl: './office-add.component.html',
  styleUrls: ['./office-add.component.scss']
})
export class OfficeAddComponent implements OnInit {
  @ViewChild("districtMultiSelect", { static: false }) districtMultiSelectComponent: MultiSelectComponent;
  @ViewChild("stateMultiSelect", { static: false }) stateMultiSelectComponent: MultiSelectComponent;
  @ViewChild("talukMultiSelect", { static: false }) talukMultiSelectComponent: MultiSelectComponent;
  @ViewChild("villageMultiSelect", { static: false }) villageMultiSelectComponent: MultiSelectComponent;
  @ViewChild("departmentMultiSelect", { static: false }) departmentMultiSelecttComponent: MultiSelectComponent;
  @Output() saveEvent = new EventEmitter();
  title: String;
  officeForm: FormGroup;
  id: String;
  isSubmit: boolean;
  departments: any = [];
  selectedDepartments: any = [];
  states: any = [];
  selectedState: any;
  districts: any = [];
  selectedDistrict: any;
  taluks:any=[];
  selectedTaluk:any;
  villages:any=[];
  selectedVillage:any;
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commonToastrService: CommonToastrService,
    private officeService: OfficeService,
    public formBuilder: FormBuilder,
    private locationService: LocationService
  ) { }

  ngOnInit() {
    this.getDepartments();
    this.getStates();
    this.title = this.data?.title;
    this.officeForm = this.formBuilder.group({
      name: ["", [Validators.required, trimValidator]],
      description: ["", [Validators.required, trimValidator]],
      lat: ["", [Validators.required, trimValidator]],
      lon: ["", [Validators.required, trimValidator]],
      department: [""],
      state:[""],
      district:[""],
      taluk:[""],
      village:[""]
    });
    if (this.data.id) {
      this.officeService.getOfficeById(this.data?.id).subscribe((data: any) => {
        this.id = data?.id;
        this.selectedDepartments = data?.department;
        this.selectedState = data?.state;
        this.selectedDistrict = data?.district;
        this.selectedTaluk = data?.taluk;
        this.selectedVillage = data?. village;
        this.officeForm = this.formBuilder.group({
          name: data?.name,
          description: data?.description,
          lat: data?.lat,
          lon: data?.lon,
          department: this.selectedDepartments,
          state:this.selectedState,
          district:this.selectedDistrict,
          taluk:this.selectedTaluk,
          village:this.selectedVillage

        });
      });
    }
    this.isSubmit = false;
  }

  getStates = () => {
    this.locationService.getAllStates().toPromise().then((data: any[]) => {
      this.states = data;
    })
  }

  onSelectionChange(event: any) {
    this.selectedDepartments = event;
  }

  onStateChange = (event) => {
    if (event) {
      this.locationService.getAllDistrictByState(event?.id).toPromise().then((data: any[]) => {
        this.selectedDistrict = "";
        this.selectedTaluk = "";
        this.selectedVillage = "";
        this.districts = data;
      })
    }
  }
  onDistrictChange = (event) => {
    if (event) {
      this.locationService.getAllTalukByDistrict(event?.id).toPromise().then((data: any[]) => {
        this.selectedTaluk = "";
        this.selectedVillage = "";
        this.taluks = data;
      })
    }
  }

  onTalukChange=(event)=>{
    if (event) {
      this.locationService.getVillageByTaluk(event?.id).toPromise().then((data: any[]) => {
        this.selectedVillage = "";
        this.villages = data;
      })
    }
  }

  submitForm = () => {
    this.isSubmit = true;
    this.stateMultiSelectComponent.formInvalid();
    this.districtMultiSelectComponent.formInvalid();
    this.talukMultiSelectComponent.formInvalid();
    this.villageMultiSelectComponent.formInvalid();
    this.saveEvent.emit(true);
    this.officeForm.patchValue({
      department: this.selectedDepartments,
      state:this.selectedState,
      district:this.selectedDistrict,
      taluk:this.selectedTaluk,
      village:this.selectedVillage
    })
    let data = this.officeForm?.value;
    if (this.id) {
      data.id = this.id;
    }
    console.log(data);
    this.sendForm(data);
  };

  sendForm = (data) => {
    if (!this.officeForm.invalid) {
      this.officeService
        .addOffice(data)
        .toPromise()
        .then((data: any) => {
          this.cancel();
          this.commonToastrService.showSuccess("Added Successfully", "Office");
        });
    }
  };


  getDepartments = () => {
    this.officeService.getAllDepartments().toPromise().then((data: any[]) => {
      this.departments = data;
    })
  }

  get basic() {
    return this.officeForm.controls;
  }

  cancel = () => {
    this.dialogRef.close(true);
  };

}


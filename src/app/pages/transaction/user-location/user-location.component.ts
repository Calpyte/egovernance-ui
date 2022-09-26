import { DatePipe } from '@angular/common';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output, SystemJsNgModuleLoader } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ResponseModalService } from '../../../common-shared/response-modal/response-modal.service';
import { AppUserDetailComponent } from '../../master/app-user/app-user-detail/app-user-detail.component';
import { AppUserService } from '../../master/app-user/app-user.service';
import { UserLocationService } from './user-location.service';

@Component({
  selector: 'ngx-user-location',
  templateUrl: './user-location.component.html',
  styleUrls: ['./user-location.component.scss']
})
export class UserLocationComponent implements OnInit {
  matDialogRef: MatDialogRef<any>;
  lat: any;
  lng: any ;
  previous;
  click: boolean = false;
  index: number;
  userAddress:any=[];
  markers:any = [];
  data: any;
  transactionCoordinates:any=[];
  users:any = [];
  start_end_mark = [];
  latlng = [];
  locationForm: FormGroup;
  selectedUser:any = {};
  zoom= 10;
  panelOpenState = false;
  minZoom= 3;
  distance = 0;

  constructor( private userLocationService:UserLocationService,
    private responseModalService:ResponseModalService,
    private appUserService:AppUserService,
    private router :Router,
    public formBuilder: FormBuilder,
    public datepipe: DatePipe,
 ) {
 }

  ngOnInit() {
    this.getAllUsers();
    this.lat=13.0827;
    this.lng=80.2707;
    this.locationForm = this.formBuilder.group({
      id: [""],
      name:[""],
    });
  }




  submitForm = () => {
    this.locationForm.patchValue({
      id:this.selectedUser.id,
    })
    let data = this.locationForm.value;
    if (data.name != null)
    data.name = this.datepipe.transform(
      this.locationForm?.value?.name,
      'yyyy-MM-dd'
    );
    this.getTransactionCoordinates(data);
  };

  getTransactionCoordinates=(data)=>{
    this.userLocationService.getTransactionCoordinates(data).toPromise().then((data:any)=>{
      this.latlng = [];
      this.start_end_mark = [];
      this.distance = 0;
      this.transactionCoordinates = data.coordinates;
      this.transactionCoordinates.forEach((element:any,i:any ) => {
        let coordinates=[
          parseFloat(element?.latitude),
          parseFloat(element?.longitude),
          this.selectedUser?.name,
          this.selectedUser?.id
        ]
        this.latlng.push(coordinates);
        this.start_end_mark.push(coordinates);
      });
      this.distance =   this.getDistance(this.transactionCoordinates);
    })
  }

  getDistance=(latLongArray:any[])=>{
  let distance = 0;
   for(var i=0;i <= latLongArray.length ; i++ ){
    var j=i+1;
     if(j < latLongArray.length){
      distance = this.getDistanceFromLatLonInKm(latLongArray[i].latitude,latLongArray[i].longitude,latLongArray[j].latitude,latLongArray[j].longitude)+distance;
     }
   }
   return distance;
  }

  clickedMarker(infoWindow: any, index: any) { 

  }
  showDetail=(userId:any)=>{
    this.appUserService.getUserById(userId).toPromise().then((data: any[]) => {
      this.responseModalService.openModalRight(AppUserDetailComponent, data);
    });
  }

  getAllUsers=()=>{
    this.appUserService.getAllUsers().toPromise().then((data:any)=>{
      this.users = data;
    })
  }

resetForm=()=>{
  this.locationForm = this.formBuilder.group({
    id: [""],
    name:[""],
  });
  this.selectedUser = {};
  this.latlng = [];
  this.start_end_mark = [];
  this.distance = 0;
}

 getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371;
  var dLat = this.deg2rad(lat2-lat1);
  var dLon = this.deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2) ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d;
}

 deg2rad(deg) {
  return deg * (Math.PI/180)
}

}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

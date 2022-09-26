import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ngx-app-user-detail',
  templateUrl: './app-user-detail.component.html',
  styleUrls: ['./app-user-detail.component.scss']
})
export class AppUserDetailComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>) { }
   detailData:any;

  ngOnInit() {
    this.detailData=this.data;

  }
close(){
  this.dialogRef.close(true);
}


}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ResponseModalService } from '../../../common-shared/response-modal/response-modal.service';
import { ActivityService } from '../activity.service';

@Component({
  selector: 'ngx-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailComponent implements OnInit {
  matDialogRef: MatDialogRef<any>;
  detailPageData:any;
  title:any = "Activity";
  ratings:any = [];
  img:Blob;
  imageURL:SafeUrl


  constructor( public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private activityService:ActivityService,
    private responseModalService:ResponseModalService,
    private sanitizer: DomSanitizer,
    ) { }


  ngOnInit() {
    this.detailPageData=this.data;
    if(this.detailPageData?.ratings){
      for(var i = 0;i < parseInt(this.detailPageData?.ratings);i++){this.ratings.push(i)}
    }
  }

  firstImg=(imagePath:any)=>{
    this.responseModalService.OpenStatusModal(imagePath,"","")
  }
  secondImg=(imagePath:any)=>{
    this.responseModalService.OpenStatusModal(imagePath,"","")
  }

  close=()=>{
    this.dialogRef.close(true);
  }

}

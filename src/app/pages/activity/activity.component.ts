import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ResponseModalService } from '../../common-shared/response-modal/response-modal.service';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';

@Component({
  selector: 'ngx-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  matDialogRef: MatDialogRef<any>;
  //Trigger reload to list
  activityReloadEvent: Subject<void> = new Subject<void>();
  //Page Header
  title: string = "Activity";            //To set the title for page header
  buttonText: string = "Add Department";   //To set the add button text for page header
  //Form
  editData: any = {};                  //Send edit data to add component
  constructor(private responseModalService: ResponseModalService) {}
  ngOnInit(): void {}
  add = () => {
    let data = { title: this.buttonText };
    this.openModal(ActivityDetailComponent, data);
  };
  emitEventToReload = () => {
    this.activityReloadEvent.next();
  };
  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.editData.title = "Edit Activity";
    this.openModal(ActivityDetailComponent, this.editData);
  };
  openModal = (component: any, data: any) => {
    this.matDialogRef = this.responseModalService.openModalSM(component, data);
    this.matDialogRef.afterClosed().subscribe((res) => {
      this.emitEventToReload();
    });
  };
  search = (text) => {
    this.activityReloadEvent.next(text);
  };
}

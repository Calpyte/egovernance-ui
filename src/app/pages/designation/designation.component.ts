import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ResponseModalService } from '../../common-shared/response-modal/response-modal.service';
import { DepartmentAddComponent } from '../department/department-add/department-add.component';
import { DesignationAddComponent } from './designation-add/designation-add.component';

@Component({
  selector: 'ngx-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss']
})
export class DesignationComponent implements OnInit {

  matDialogRef: MatDialogRef<any>;
  //Trigger reload to list
  designationReloadEvent: Subject<void> = new Subject<void>();
  //Page Header
  title: string = "Designation";            //To set the title for page header
  buttonText: string = "Add Designation";   //To set the add button text for page header
  //Form
  editData: any = {};                  //Send edit data to add component
  constructor(private responseModalService: ResponseModalService) {}
  ngOnInit(): void {}
  add = () => {
    let data = { title: this.buttonText };
    this.openModal(DesignationAddComponent, data);
  };
  emitEventToReload = () => {
    this.designationReloadEvent.next();
  };
  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.editData.title = "Edit Designation";
    this.openModal(DesignationAddComponent, this.editData);
  };
  openModal = (component: any, data: any) => {
    this.matDialogRef = this.responseModalService.openModalSM(component, data);
    this.matDialogRef.afterClosed().subscribe((res) => {
      this.emitEventToReload();
    });
  };
  search = (text) => {
    this.designationReloadEvent.next(text);
  };

}

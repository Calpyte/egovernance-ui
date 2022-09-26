import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ResponseModalService } from '../../../common-shared/response-modal/response-modal.service';
import { DepartmentAddComponent } from '../department-add/department-add.component';

@Component({
  selector: 'ngx-department-container',
  templateUrl: './department-container.component.html',
  styleUrls: ['./department-container.component.scss']
})
export class DepartmentContainerComponent implements OnInit {
  matDialogRef: MatDialogRef<any>;
  //Trigger reload to list
  departmentsReloadEvent: Subject<void> = new Subject<void>();
  //Page Header
  title: string = "Department";            //To set the title for page header
  buttonText: string = "Add Department";   //To set the add button text for page header
  //Form
  editData: any = {};                  //Send edit data to add component
  constructor(private responseModalService: ResponseModalService) {}
  ngOnInit(): void {}
  add = () => {
    let data = { title: this.buttonText };
    this.openModal(DepartmentAddComponent, data);
  };
  emitEventToReload = () => {
    this.departmentsReloadEvent.next();
  };
  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.editData.title = "Edit Department";
    this.openModal(DepartmentAddComponent, this.editData);
  };
  openModal = (component: any, data: any) => {
    this.matDialogRef = this.responseModalService.openModalSM(component, data);
    this.matDialogRef.afterClosed().subscribe((res) => {
      this.emitEventToReload();
    });
  };
  search = (text) => {
    this.departmentsReloadEvent.next(text);
  };
}

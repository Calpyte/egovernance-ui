import { Component, OnInit } from '@angular/core';
import { MatDialogRef} from "@angular/material/dialog";
import { Subject } from 'rxjs';
import { ResponseModalService } from '../../../common-shared/response-modal/response-modal.service';
import { DepartmentAddComponent } from './department-add/department-add.component';

@Component({
  selector: 'ngx-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  buttonText: string = "Add Department";
  title: string = "Department";
  matDialogRef: MatDialogRef<any>;
  departmentReloadEvent: Subject<void> = new Subject<void>();
  editData: any = {};

  constructor(private responseModalService: ResponseModalService) {}

  ngOnInit(): void {}
  add = () => {
    let data = { title: this.buttonText };
    this.openModal(DepartmentAddComponent, data);
  };
  openModal = (component: any, data: any) => {
    this.matDialogRef = this.responseModalService.openModalSM(component, data);
    this.matDialogRef.afterClosed().subscribe((res) => {
      this.emitEventToReload();
    });
  };
  emitEventToReload = () => {
    this.departmentReloadEvent.next();
  };
  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.editData.title = "Edit Department";
    this.openModal(DepartmentAddComponent, this.editData);
  };
  search = (text) => {
    this.departmentReloadEvent.next(text);
  };

}

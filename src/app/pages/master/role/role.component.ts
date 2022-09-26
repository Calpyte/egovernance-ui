import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ResponseModalService } from '../../../common-shared/response-modal/response-modal.service';
import { RoleAddComponent } from './role-add/role-add.component';

@Component({
  selector: 'ngx-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  buttonText: string = "Add Role";
  title: string = "Role";
  matDialogRef: MatDialogRef<any>;
  roleReloadEvent: Subject<void> = new Subject<void>();
  editData: any = {};

  constructor(private responseModalService: ResponseModalService) {}

  ngOnInit(): void {}
  add = () => {
    let data = { title: this.buttonText };
    this.openModal(RoleAddComponent, data);
  };
  openModal = (component: any, data: any) => {
    this.matDialogRef = this.responseModalService.openModalSM(component, data);
    this.matDialogRef.afterClosed().subscribe((res) => {
      this.emitEventToReload();
    });
  };
  emitEventToReload = () => {
    this.roleReloadEvent.next();
  };
  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.editData.title = "Edit Role";
    this.openModal(RoleAddComponent, this.editData);
  };
  search = (text) => {
    this.roleReloadEvent.next(text);
  };
}

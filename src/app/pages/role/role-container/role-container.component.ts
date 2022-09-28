import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ResponseModalService } from '../../../common-shared/response-modal/response-modal.service';
import { RoleAddComponent } from '../role-add/role-add.component';

@Component({
  selector: 'ngx-role-container',
  templateUrl: './role-container.component.html',
  styleUrls: ['./role-container.component.scss']
})
export class RoleContainerComponent implements OnInit {

  matDialogRef: MatDialogRef<any>;
  //Trigger reload to list
  rolesReloadEvent: Subject<void> = new Subject<void>();
  //Page Header
  title: string = "Role";            //To set the title for page header
  buttonText: string = "Add Role";   //To set the add button text for page header
  editData: any = {};

  constructor(private responseModalService: ResponseModalService) { }

  ngOnInit(): void {}
  add = () => {
    let data = { title: this.buttonText };
    this.openModal(RoleAddComponent, data);
  };
  emitEventToReload = () => {
    this.rolesReloadEvent.next();
  };
  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.editData.title = "Edit Role";
    this.openModal(RoleAddComponent, this.editData);
  };

  openModal = (component: any, data: any) => {
    this.matDialogRef = this.responseModalService.openModalSM(component, data);
    this.matDialogRef.afterClosed().subscribe((res) => {
       this.emitEventToReload();
    });
  };
  search = (text) => {
    this.rolesReloadEvent.next(text);
  };

}

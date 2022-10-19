import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ResponseModalService } from '../../../common-shared/response-modal/response-modal.service';
import { UserAddComponent } from '../user-add/user-add.component';

@Component({
  selector: 'ngx-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss']
})
export class UserContainerComponent implements OnInit {


  userReloadEvent: Subject<void> = new Subject<void>();
  title: String = "User";
  buttonText: String = "Add User";
  matDialogRef: MatDialogRef<any>;
  editData: any = {};

  constructor(private responseModalService: ResponseModalService) { }

  ngOnInit(): void {}
  add = () => {
    let data = { title: this.buttonText };
    // this.router.navigate(["pages/user/add"]);
    this.openModal(UserAddComponent, data);
  };

  openModal = (component: any, data: any) => {
    this.matDialogRef = this.responseModalService.openModalSMD(component, data);
    this.matDialogRef.afterClosed().subscribe((res) => {
      this.emitEventToReload();
    });
  };

  emitEventToReload = () => {
    this.userReloadEvent.next();
  };
  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.editData.title = "Edit User";
    this.openModal(UserAddComponent, this.editData);
  };

}

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ResponseModalService } from '../../../common-shared/response-modal/response-modal.service';
import { RoleAddComponent } from '../role/role-add/role-add.component';
import { AppUserAddComponent } from './app-user-add/app-user-add.component';

@Component({
  selector: 'ngx-app-user',
  templateUrl: './app-user.component.html',
  styleUrls: ['./app-user.component.scss']
})
export class AppUserComponent implements OnInit {
  buttonText: string = "Add User";
  title: string = "User";
  matDialogRef: MatDialogRef<any>;
  userReloadEvent: Subject<void> = new Subject<void>();
  editData: any = {};

  constructor(
    private responseModalService: ResponseModalService,
    private router: Router) {}

  ngOnInit(): void {}
  add = () => {
    let data = { title: this.buttonText };
    this.router.navigate(["pages/master/app-user/add"]);
    // this.openModal(AppUserAddComponent, data);
  };
  openModal = (component: any, data: any) => {
    this.matDialogRef = this.responseModalService.openModalSM(component, data);
    this.matDialogRef.afterClosed().subscribe((res) => {
      this.emitEventToReload();
    });
  };
  emitEventToReload = () => {
    this.userReloadEvent.next();
  };
  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.router.navigate(["pages/master/app-user/edit/" + rowId]);
    // this.editData.id = rowId;
    // this.editData.title = "Edit User";
    // this.openModal(AppUserAddComponent, this.editData);
  };
  search = (text) => {
    this.userReloadEvent.next(text);
  };

}

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ResponseModalService } from '../../../common-shared/response-modal/response-modal.service';
import { UserAddComponent } from '../user-add/user-add.component';

@Component({
  selector: 'ngx-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss']
})
export class UserContainerComponent implements OnInit {

  title: String = "User";
  buttonText: String = "Add User";
  matDialogRef: MatDialogRef<any>;

  constructor(
    private responseModalService: ResponseModalService,
    private router: Router
    ) { }

  ngOnInit(): void {}
  add = () => {
    let data = { title: this.buttonText };
    // this.router.navigate(["pages/user/add-user"]);
    this.openModal(UserAddComponent, data);
  };  

  openModal = (component: any, data: any) => {
    this.matDialogRef = this.responseModalService.openModalSM(component, data);
    this.matDialogRef.afterClosed().subscribe((res) => {
      // this.emitEventToReload();
    });
  };

}

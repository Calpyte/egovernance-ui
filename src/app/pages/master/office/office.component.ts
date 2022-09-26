import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ResponseModalService } from '../../../common-shared/response-modal/response-modal.service';
import { OfficeAddComponent } from './office-add/office-add.component';

@Component({
  selector: 'ngx-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent implements OnInit {
  buttonText:String = "Add office";
  title: string = "Office";
  matDialogRef: MatDialogRef<any>;
  officeReloadEvent: Subject<void> = new Subject<void>();
  editData: any = {};

  constructor(private responseModalService: ResponseModalService) { }

  ngOnInit(): void{}
   add = () => {
      let data = { title: this.buttonText };
      this.openModal(OfficeAddComponent, data);
    };
    openModal = (component: any, data: any) => {
      this.matDialogRef = this.responseModalService.openModalSM(component, data);
      this.matDialogRef.afterClosed().subscribe((res) => {
        this.emitEventToReload();
      });
    };
    emitEventToReload = () => {
      this.officeReloadEvent.next();
    };

    edit = (rowId: any) => {
      this.editData.id = rowId;
      this.editData.title = "Edit Department";
      this.openModal(OfficeAddComponent, this.editData);
    };
    search = (text) => {
      this.officeReloadEvent.next(text);
    };
}

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ResponseModalService } from '../../../common-shared/response-modal/response-modal.service';
import { OfficeAddComponent } from '../office-add/office-add.component';

@Component({
  selector: 'ngx-office-container',
  templateUrl: './office-container.component.html',
  styleUrls: ['./office-container.component.scss']
})
export class OfficeContainerComponent implements OnInit {

  matDialogRef: MatDialogRef<any>;
  officesReloadEvent: Subject<void> = new Subject<void>();

  title: string = "Office";
  buttonText: string = "Add Office";
  editData: any = {};

  constructor(private responseModalService: ResponseModalService) { }

  ngOnInit(): void {}
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
    this.officesReloadEvent.next();
  };
  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.editData.title = "Edit Office";
    this.openModal(OfficeAddComponent, this.editData);
  };
  search = (text) => {
    this.officesReloadEvent.next(text);
  };

}

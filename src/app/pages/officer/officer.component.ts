import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ResponseModalService } from '../../common-shared/response-modal/response-modal.service';
import { OfficeAddComponent } from '../office/office-add/office-add.component';
import { OfficerAddComponent } from './officer-add/officer-add.component';

@Component({
  selector: 'ngx-officer',
  templateUrl: './officer.component.html',
  styleUrls: ['./officer.component.scss']
})
export class OfficerComponent implements OnInit {

  matDialogRef: MatDialogRef<any>;
  officerReloadEvent: Subject<void> = new Subject<void>();

  title: string = "Officer";
  buttonText: string = "Add Officer";
  editData: any = {};

  constructor(private responseModalService: ResponseModalService) { }

  ngOnInit(): void {}
  add = () => {
    let data = { title: this.buttonText };
    this.openModal(OfficerAddComponent, data);
  };
  openModal = (component: any, data: any) => {
    this.matDialogRef = this.responseModalService.openModalSMD(component, data);
    this.matDialogRef.afterClosed().subscribe((res) => {
       this.emitEventToReload();
    });
  };
  emitEventToReload = () => {
    this.officerReloadEvent.next();
  };
  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.editData.title = "Edit Officer";
    this.openModal(OfficerAddComponent, this.editData);
  };
  search = (text) => {
    this.officerReloadEvent.next(text);
  };


}

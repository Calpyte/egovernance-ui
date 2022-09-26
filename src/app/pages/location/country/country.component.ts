import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ResponseModalService } from '../../../common-shared/response-modal/response-modal.service';
import { CountryAddComponent } from './country-add/country-add.component';

@Component({
  selector: 'ngx-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  buttonText: string = "Add Country";
  title: string = "Country";
  matDialogRef: MatDialogRef<any>;
  countryReloadEvent: Subject<void> = new Subject<void>();
  editData: any = {};

  constructor(
     private responseModalService: ResponseModalService
    ) {}

    ngOnInit(): void {}
    add = () => {
      let data = { title: this.buttonText };
      this.openModal(CountryAddComponent, data);
    };
    openModal = (component: any, data: any) => {
      this.matDialogRef = this.responseModalService.openModalSM(component, data);
      this.matDialogRef.afterClosed().subscribe((res) => {
        this.emitEventToReload();
      });
    };
    emitEventToReload = () => {
      this.countryReloadEvent.next();
    };
    // edit = (rowId: any) => {
    //   this.editData.id = rowId;
    //   this.editData.title = "Edit Department";
    //   this.openModal(CountryAddComponent, this.editData);
    // };
    search = (text) => {
      this.countryReloadEvent.next(text);
    };
  
  

}

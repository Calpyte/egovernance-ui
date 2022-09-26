import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficeComponent } from './office.component';
import { CommonSharedModule } from '../../../common-shared/common-shared.module';
import { NbCardModule } from '@nebular/theme';
import { OfficeRoutes } from './office.routing';
import { OfficeAddComponent } from './office-add/office-add.component';
import { OfficeListComponent } from './office-list/office-list.component';

@NgModule({
  imports: [
    CommonModule,
    CommonSharedModule,
    NbCardModule,
    OfficeRoutes
  ],
  declarations: [OfficeComponent, OfficeAddComponent, OfficeListComponent],
  // entryComponents:[OfficeAddComponent]
})
export class OfficeModule { }

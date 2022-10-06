import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonSharedModule } from '../../common-shared/common-shared.module';
import { OfficeRoutes } from './office.routing';
import { OfficeContainerComponent } from './office-container/office-container.component';
import { OfficeAddComponent } from './office-add/office-add.component';
import { OfficeListComponent } from './office-list/office-list.component';

@NgModule({
  imports: [
    CommonModule,
    CommonSharedModule,
    OfficeRoutes
  ],
  declarations: [
    OfficeContainerComponent,
    OfficeAddComponent,
    OfficeListComponent
  ],
  entryComponents: [OfficeAddComponent]
})
export class OfficeModule { }

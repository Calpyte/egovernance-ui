import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficerComponent } from './officer.component';
import { CommonSharedModule } from '../../common-shared/common-shared.module';
import { OfficerRoutes } from './officer.routing';
import { OfficerAddComponent } from './officer-add/officer-add.component';
import { OfficerListComponent } from './officer-list/officer-list.component';

@NgModule({
  imports: [
    CommonModule,
    CommonSharedModule,
    OfficerRoutes
  ],
  declarations: [OfficerComponent,OfficerAddComponent,OfficerListComponent],
  entryComponents:[OfficerAddComponent]
})
export class OfficerModule { }

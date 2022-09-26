import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentAddComponent } from './department-add/department-add.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentContainerComponent } from './department-container/department-container.component';
import { CommonSharedModule } from '../../common-shared/common-shared.module';


@NgModule({
  declarations: [
    DepartmentAddComponent,
    DepartmentListComponent,
    DepartmentContainerComponent
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    CommonSharedModule
  ],
  entryComponents:[
    DepartmentAddComponent
  ]
})
export class DepartmentModule { }

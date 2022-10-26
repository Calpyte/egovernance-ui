import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignationComponent } from './designation.component';
import { CommonSharedModule } from '../../common-shared/common-shared.module';
import { DesignationRoutes } from './designation.routing';
import { DesignationAddComponent } from './designation-add/designation-add.component';
import { DesignationListComponent } from './designation-list/designation-list.component';

@NgModule({
  imports: [
    CommonModule,
    CommonSharedModule,
    DesignationRoutes
  ],
  declarations: [DesignationComponent,DesignationAddComponent,DesignationListComponent]
})
export class DesignationModule { }

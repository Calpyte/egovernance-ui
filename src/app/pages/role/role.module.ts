import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleContainerComponent } from './role-container/role-container.component';
import { RoleAddComponent } from './role-add/role-add.component';
import { RoleListComponent } from './role-list/role-list.component';
import { CommonSharedModule } from '../../common-shared/common-shared.module';
import { RoleRoutes } from './role.routing';

@NgModule({
  imports: [
    CommonModule,
    CommonSharedModule,
    RoleRoutes
  ],
  declarations: [
    RoleContainerComponent, 
    RoleAddComponent,
    RoleListComponent
    ],
    entryComponents: [RoleAddComponent]
})
export class RoleModule { }

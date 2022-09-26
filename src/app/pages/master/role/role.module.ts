import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleAddComponent } from './role-add/role-add.component';
import { CommonSharedModule } from '../../../common-shared/common-shared.module';
import { RoleRoutes } from './role.routing';
import { NbCardModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    CommonSharedModule,
    RoleRoutes,
    NbCardModule
  ],
  declarations: [RoleComponent,RoleListComponent,RoleAddComponent],
  entryComponents:[RoleAddComponent]
})
export class RoleModule { }

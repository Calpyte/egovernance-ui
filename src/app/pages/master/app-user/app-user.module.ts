import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppUserComponent } from './app-user.component';
import { AppUserListComponent } from './app-user-list/app-user-list.component';
import { AppUserAddComponent } from './app-user-add/app-user-add.component';
import { AppUserRoutes } from './app-user.routing';
import { CommonSharedModule } from '../../../common-shared/common-shared.module';
import { NbCardModule } from '@nebular/theme';
import { AppUserDetailComponent } from './app-user-detail/app-user-detail.component';

@NgModule({
  imports: [
    CommonModule,
    AppUserRoutes,
    CommonSharedModule,
    NbCardModule
  ],
  declarations: [AppUserComponent,AppUserListComponent,AppUserAddComponent,AppUserDetailComponent],
  entryComponents:[AppUserAddComponent]
})
export class AppUserModule { }

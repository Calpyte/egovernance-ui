import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonSharedModule } from '../../common-shared/common-shared.module';
import { UserRoutes } from './user.routing';
import { UserContainerComponent } from './user-container/user-container.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  imports: [
    CommonModule,
    CommonSharedModule,
    UserRoutes    
  ],
  declarations: [
    UserContainerComponent,
    UserAddComponent,
    UserListComponent
  ],
  entryComponents: [UserAddComponent]
})
export class UserModule { }
